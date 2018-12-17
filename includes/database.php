<?php
$servername = "localhost";
$username = "klass6";
$password = "klass6";
$dbname = "weather_station";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 