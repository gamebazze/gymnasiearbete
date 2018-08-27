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
while True:

  line = ser.readline()

  if line:

    print "Data is comming"

    values = line.split("|")

    temp = values[1]

    humidity = values[0]

    print temp
    print humidity

    date = datetime.datetime.now()

    date_string = date.strftime("%Y-%m-%d %H:%M:%S")

    sql = "INSERT INTO temperature (value, date) VALUES (%s, %s)"
    val = (str(temp), date_string)
    mycursor.execute(sql, val)

    mydb.commit()

    print(mycursor.rowcount, "record inserted.")

    sql = "INSERT INTO humidity (value, date) VALUES (%s, %s)"
    val = (str(humidity), date_string) 
    mycursor.execute(sql, val)

    mydb.commit()

    print(mycursor.rowcount, "record inserted.")
