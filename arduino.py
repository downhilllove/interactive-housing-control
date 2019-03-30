import os
import time
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

time.sleep(5)

try:
    while True:
        arduinoData = arduino.readline()
        temperatureCelsius = 10
        humidityPercentage = 20
        cursor.execute(getInsertQuery(temperatureCelsius, humidityPercentage))
        db.commit()
        print("Inserted ")
except KeyboardInterrupt:
    arduino.close()
