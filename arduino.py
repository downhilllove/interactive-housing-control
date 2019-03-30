import os
import time
import re
from datetime import datetime
import mysql.connector
import serial
from dotenv import load_dotenv

# Load db credentials from .env
load_dotenv()
DB_HOST = os.getenv("DB_HOST")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_DATABASE = os.getenv("DB_DATABASE")

# Helper functions
def getCurrentDateString():
    return datetime.now().strftime("%Y-%m-%d %H:%M:%S")


def getInsertQuery(temperatureCelsius, humidityPercentage):
    query = "INSERT INTO Measurements (date, temperatureCelsius, humidityPercentage) VALUES (%s, %s, %s)"
    return query % (getCurrentDateString(), temperatureCelsius, humidityPercentage)


def matchHumidityRegex(line):
    return re.match("b'Luftfeuchtigkeit:\s(\d+\.\d+)\s%\\r\\n'", line)


def matchTemperatureRegex(line):
    return re.match("b'Temperatur:\s(\d+.\d+)\sGrad\sCelsius\\r\\n'", line)


# Connect to database
db = mysql.connector.connect(
    host=DB_HOST, user=DB_USER, password=DB_PASSWORD, database=DB_DATABASE
)
cursor = db.cursor()
print("MariaDB connection successfully established")

# Connect to Arduino
arduino = serial.Serial("/dev/ttyUSB1", 9600)
if arduino.isOpen():
    print("Arduino connection successfully established")

# Wait 5 seconds
time.sleep(5)

# Dictionary for database inserts
measurement = {"temperatureCelsius": 0, "humidityPercentage": 0}

# Looping variables
foundHumidity = False
foundTemperature = False

try:
    while True:
        line = arduino.readline()

        # Check if current line matches regexes
        humidityMatch = matchHumidityRegex(data)
        temperatureMatch = matchTemperatureRegex(data)

        if humidityMatch:
            measurement["temperatureCelsius"] = float(humidityMatch.group(1))
            foundHumidity = True

        if temperatureMatch:
            measurement["humidityPercentage"] = float(temperatureMatch.group(1))
            foundTemperature = True

        if foundHumidity and foundTemperature:
            print(
                "New measurement: Temperature:",
                measurement["temperatureCelsius"],
                "Humidity:",
                measurement["humidityPercentage"],
            )
            foundHumidity = False
            foundTemperature = False

        # cursor.execute(getInsertQuery(measurement['temperatureCelsius'], measurement['humidityPercentage']))
        # db.commit()
except KeyboardInterrupt:
    arduino.close()
