<?php 
require_once "../includes/database.php";

$date = date("Y-m-d");

$sql = "SELECT date, AVG(value) AS value FROM temperature WHERE date BETWEEN '2018-08-29' AND '2018-08-30' GROUP BY date";
$result = $conn->query($sql);

$temperatures = array();

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        $temperatures[] = array(
            'value' => $row['value'],
            'date' => date( "Y-m-d", strtotime( $row['date']) )
        );
    }
}

$sql = "SELECT date, AVG(value) AS value FROM humidity WHERE date BETWEEN '2018-08-29' AND '2018-08-30' GROUP BY date";
$result = $conn->query($sql);

$humidity = array();

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        $humidity[] = array(
            'value' => $row['value'],
            'date' => $row['date']
        );
    }
}

header("Content-Type: application/json");
echo "'" . json_encode(array('temperatures' => $temperatures, 'humidity' => $humidity)) . "'";