<?php
$servername = "localhost";
$username = "klass6";
$password = "klass6";
$dbname = "test_wheater_station";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 