# interactive-housing-control

School project for HTL Anichstraße

## Environment variables

The following environment variables need to be put in a `.env` file located in the root of the project:

- `DB_HOST`: MariaDB Host
- `DB_USER`: Database user
- `DB_PASSWORD`: Password for database user
- `DB_DATABASE`: Name of database

## Arduino

The program for connecting to Arduino and writing measurements to the database is written in Python. Follow the instructions to get up and running:

### Install required modules

```
$ pip3 install -r requirements.txt
```

### Start the python app

```
$ python3 arduino.py
```
