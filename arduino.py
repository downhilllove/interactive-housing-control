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

# Set Arduino port
PORT = "/dev/ttyUSB1"

# Helper functions
def getCurrentDateString():
    return datetime.now().strftime("%Y-%m-%d %H:%M:%S")


def getInsertQuery(temperatureCelsius, humidityPercentage):
    query = "INSERT INTO Measurements (date, temperatureCelsius, humidityPercentage) VALUES ('%s', %s, %s)"
    return query % (getCurrentDateString(), temperatureCelsius, humidityPercentage)


def matchHumidityRegex(line):
    return re.match("Luftfeuchtigkeit:\s(\d+\.\d+)\s%", line)


def matchTemperatureRegex(line):
    return re.match("Temperatur:\s(\d+.\d+)\sGrad\sCelsius", line)


# Connect to database
db = mysql.connector.connect(
    host=DB_HOST, user=DB_USER, password=DB_PASSWORD, database=DB_DATABASE
)
cursor = db.cursor()
print("MariaDB connection successfully established")

# Connect to Arduino
arduino = serial.Serial(PORT, 9600)
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
        decodedLine = line.decode(encoding="UTF-8")

        # Check if current line matches regexes
        humidityMatch = matchHumidityRegex(decodedLine)
        temperatureMatch = matchTemperatureRegex(decodedLine)

        if humidityMatch:
            measurement["temperatureCelsius"] = float(humidityMatch.group(1))
            foundHumidity = True

        if temperatureMatch:
            measurement["humidityPercentage"] = float(temperatureMatch.group(1))
            foundTemperature = True

        if foundHumidity and foundTemperature:
            print(
                "Temperature:",
                measurement["temperatureCelsius"],
                "° Celsius",
                "Humidity:",
                measurement["humidityPercentage"],
                "%",
            )

            # Write to db
            query = getInsertQuery(
                measurement["temperatureCelsius"], measurement["humidityPercentage"]
            )
            cursor.execute(query)
            db.commit()

            # Reset looping variables
            foundHumidity = False
            foundTemperature = False
except KeyboardInterrupt:
    arduino.close()
