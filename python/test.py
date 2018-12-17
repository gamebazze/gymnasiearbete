import serial
import mysql.connector
import datetime

mydb = mysql.connector.connect(
  host="localhost",
  user="klass6",
  passwd="klass6",
  database="weather_station"
)
mycursor = mydb.cursor()

ser = serial.Serial('/dev/ttyACM0', 9600)

print("Script started")

while True:

  line = ser.readline()

  if line:

    whenValue = "Values incoming"

    values = line.split("|")

    temp = values[1]

    temp = temp.replace('\r', '')

    humidity = values[0]

    humidity = humidity.replace('\r', '')

    date = datetime.datetime.now()

    date_string = date.strftime("%Y-%m-%d %H:%M:%S")

    sql = "INSERT INTO temperature (value, date) VALUES (%s, %s)"
    val = (str(temp), date_string)
    mycursor.execute(sql, val)

    mydb.commit()

    sql = "INSERT INTO humidity (value, date) VALUES (%s, %s)"
    val = (str(humidity), date_string) 
    mycursor.execute(sql, val)

    mydb.commit()
