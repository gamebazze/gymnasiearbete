import serial
import mysql.connector
import datetime

mydb = mysql.connector.connect(
  host="localhost",
  user="pi",
  passwd="raspberry",
  database="wheater_station"
)
mycursor = mydb.cursor()

ser = serial.Serial('/dev/ttyACM0', 9600)
while ser.in_waiting:
    
    line = ser.readline()

    values = line.split("|")

    temp = values[1]

    humidity = values[0]

    date = datetime.datetime.now()

    date_string = date.strftime("%Y-%m-%d %H:%M")

    sql = "INSERT INTO temperature (value, date) VALUES (%s, %s)"
    val = (temp, date_string)
    mycursor.execute(sql, val)

    sql = "INSERT INTO humidity (value, date) VALUES (%s, %s)"
    val = (humidity, date_string) 
    mycursor.execute(sql, val)
