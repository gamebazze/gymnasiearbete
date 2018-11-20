<?php 
require_once "../includes/database.php";

header("Content-Type: application/json");


if( !isset($_GET['action']) ){
    http_response_code (400);
    echo "'" . json_encode( array('error' => "No action specified") ) . "'";
    return;
}
$action = $_GET['action'];

switch($action){
    case "get_between":

        if(!isset($_GET['first_date']) && !isset($_GET['last_date'])) {
            http_response_code (400);
            echo "'" . json_encode( array('error' => "You need to specify dates") ) . "'";
            return;
        }

        $date = date("Y-m-d");

        $sql = "SELECT date, AVG(value) AS value FROM temperature WHERE date BETWEEN '$_GET[first_date]' AND DATE_ADD('$_GET[last_date]', INTERVAL 1 DAY) GROUP BY date";
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

        $sql = "SELECT date, AVG(value) AS value FROM humidity WHERE date BETWEEN '$_GET[first_date]' AND DATE_ADD('$_GET[last_date]', INTERVAL 1 DAY) GROUP BY date";
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
        http_response_code (200);
        echo "'" . json_encode(array('temperatures' => $temperatures, 'humidity' => $humidity)) . "'";

        return;

    case "get_weeks":

        $weeks = array();

        $sql = "SELECT date FROM temperature";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            // output data of each row
            while($row = $result->fetch_assoc()) {
                $date = new DateTime($row['date']);
                $title = $date->format("Y V. W");

                $weeks[$title][] = $row['date'];
            }
        }

        foreach($weeks as $title => $week){
            $first_date = $week[0];
            $last_date = $week[0];

            foreach($week as $date){
                if(strtotime($date) < strtotime($first_date)){
                    $first_date = $date;
                }
                if(strtotime($date) > strtotime($last_date)){
                    $last_date = $date;
                }
            }

            $weeks[$title] = array(
                'firstDate' => $first_date,
                'lastDate' => $last_date,
            );

        }
        http_response_code (200);
        echo json_encode(array('weeks' => $weeks));
        return;

    case "get_years":
        
        $years = array();

        $sql = "SELECT DATE_FORMAT(date, '%Y') AS date FROM temperature GROUP BY DATE_FORMAT(date, '%Y')";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            // output data of each row
            while($row = $result->fetch_assoc()) {
                $years[] = $row['date'];
            }
        }

        http_response_code (200);
        echo json_encode(array('years' => $years));
        return;

    case "get_months":
        
        $months = array();

        $sql = "SELECT DATE_FORMAT(date, '%m') AS date FROM temperature WHERE date BETWEEN '$_GET[year]-01-01' AND '$_GET[year]-12-31' GROUP BY DATE_FORMAT(date, '%m')";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            // output data of each row
            while($row = $result->fetch_assoc()) {
                $months[] = $row['date'];
            }
        }

        http_response_code (200);
        echo json_encode(array('months' => $months));
        return;

    case "get_days":
        
        $days = array();

        $sql = "SELECT DATE_FORMAT(date, '%d') AS date FROM temperature WHERE date BETWEEN '$_GET[year]-$_GET[month]-01' AND '$_GET[year]-$_GET[month]-31'  GROUP BY DATE_FORMAT(date, '%d')";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            // output data of each row
            while($row = $result->fetch_assoc()) {
                $days[] = $row['date'];
            }
        }

        http_response_code (200);
        echo json_encode(array('days' => $days));
        return;
    
}



