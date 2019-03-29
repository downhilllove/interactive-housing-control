import os
import time
import mysql.connector
import serial
from dotenv import load_dotenv

# Load db credentials from .env
load_dotenv()
DB_HOST = os.getenv("DB_HOST")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_DATABASE = os.getenv("DB_DATABASE")

# Connect to database
dbConnection = mysql.connector.connect(
    host=DB_HOST, user=DB_USER, password=DB_PASSWORD, database=DB_DATABASE
)
cursor = dbConnection.cursor()
query = "INSERT INTO Measurements (date, temperatureCelsius, humidityPercentage) VALUES (%(date)s, %(temperatureCelsius)s, %(humidityPercentage)s)"

# Connect to Arduino
arduino = serial.Serial("/dev/ttyUSB1", 9600)
print(arduino.isOpen())
print("Arduino connection is being established...")

time.sleep(5)

try:
    while True:
        arduinoData = arduino.readline()
        measurement = {"date": 1, "temperatureCelsius": 10, "humidityPercentage": 40}
        cursor.execute(query, measurement)
        print(arduinoData)
except KeyboardInterrupt:
    arduino.close()
