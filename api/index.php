<?php 
require_once "../includes/database.php";

$sql = "SELECT * FROM temperature";
$result = $conn->query($sql);

$temperatures = array();

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        $temperatures[] = array(
            'value' => $row['value'],
            'date' => $row['date']
        );
    }
}

$sql = "SELECT * FROM humidity";
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