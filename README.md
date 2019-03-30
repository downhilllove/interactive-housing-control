# interactive-housing-control

School project for HTL Anichstraße

# Overview

1. [Required hardware](#Required-hardware)
2. [Installation](#Installation)
3. [Usage](#Usage)

# Required hardware

- [Raspberry Pi 3b](https://www.raspberrypi.org/products/raspberry-pi-3-model-b/)
- [Arduino Uno Rev3](https://store.arduino.cc/arduino-uno-rev3)
- ...

# Installation

## Step 1 - Raspbian OS

Download the [Raspbian Stretch OS with desktop and recommended software](https://www.raspberrypi.org/downloads/raspbian/) and flash the image to a SD with [Etcher](https://www.balena.io/etcher/). Detailed install instructions can be found at [here](https://www.raspberrypi.org/documentation/installation/installing-images/README.md).

Plug the SD into your Raspberry 3b and boot it up. After the initial boot, configure your keyboard and let it update the software.

## Step 2 - Arduino IDE

Download the [Linux ARM 32 bits Arduino IDE](https://www.arduino.cc/en/Main/Software) and follow the [official instructions](https://www.arduino.cc/en/Guide/Linux) to get up and running.

## Step 3 - Node.js

Install the [Debian Node.js 11.x binaries from nodesource](https://github.com/nodesource/distributions#debinstall):

```
$ sudo su
$ curl -sL https://deb.nodesource.com/setup_11.x | bash -
$ apt-get install -y nodejs
```

## Step 4 - MariaDB

Install MariadDB Server on your Raspberry Pi:

```
$ sudo apt-get install mariadb-server
```

Create a database and database user

```
$ sudo mysql
$ CREATE DATABASE interactive_housing_control;
$ CREATE USER 'pi' identified by 'pi';
$ GRANT ALL PRIVILEGES ON *.* TO 'pi'@localhost identified by 'pi';
```

## Step 5 - Python

Install python dependencies

(Assuming you have cloned this repository into your `~/Desktop` directory)

```
$ cd ~/Desktop/interactive-housing-control
$ pip3 install -r requirements.txt
```

## Step 6 - Environment variables

Create a file to store your environment variables:

(Assuming you have cloned this repository into your `~/Desktop` directory)

```
$ cd ~/Desktop/interactive-housing-control
$ touch .env
$ geany .env
```

Add the following variables to this file in the format `VARIABLE=value`:

- `DB_HOST`: MariaDB Host
- `DB_USER`: The database user you just created
- `DB_PASSWORD`: The password for database user you just created
- `DB_DATABASE`: Name of database

# Usage

To execute the webapp and python application, you first have to navigate to folder of this repository.

(Assuming you have cloned this repository into your `~/Desktop` directory)

```
$ cd ~/Desktop/interactive-housing-control
```

## Arduino app

...

## Webserver

```
$ npm run dev
```

## Python application

```
$ python3 arduino.py
```
