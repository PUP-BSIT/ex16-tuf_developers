<?php
$server = 'localhost';
$username = 'root';
$password = '';
$db = 'restaurant_db';

$conn = mysqli_connect($server, $username, $password, $db);

if(!$conn) {
    die('Connection not found.');
}
else if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $sql = "SELECT * from restaurant";

    $result = mysqli_query($conn, $sql);
    if(!$result) {
        die('Error reading from sql.');
    }

    $response = [];
    while($row = $result->fetch_assoc()) {
        array_push($response, [
            'id' => $row['id'],
            'restaurant_name' => $row['restaurant_name'],
            'location' => $row['location'],
            'favorite_food' => $row['favorite_food'],
            'operating_hours' => $row['operating_hours'],
            'contact_info' => $row['contact_info'],
        ]);
    }
    
    echo json_encode($response);
}
else if($_SERVER['REQUEST_METHOD'] == 'POST') {
    $restaurant_name = $_POST['restaurant_name'] ?? '';
    $location = $_POST['location'] ?? '';
    $favorite_food = $_POST['favorite_food'] ?? '';
    $operating_hours = $_POST['operating_hours'] ?? '';
    $contact_info = $_POST['contact_info'] ?? '';

    $sql = "INSERT INTO restaurant(restaurant_name,location,
        favorite_food,operating_hours,contact_info) 
        VALUES('{$restaurant_name}', '{$location}', '{$favorite_food}', 
            '{$operating_hours}', 
            '{$contact_info}')";

    if(!mysqli_query($conn, $sql)) {
        die(mysqli_error($conn));
    }

    echo 'Inserted successfully.';
}
else if ($_SERVER['REQUEST_METHOD'] == 'PATCH') {
    parse_str(file_get_contents('php://input'), $_PATCH);

    $id = $_PATCH['id'] ?? '';
    $restaurant_name = $_PATCH['restaurant_name'] ?? '';
    $location = $_PATCH['location'] ?? '';
    $favorite_food = $_PATCH['favorite_food'] ?? '';
    $operating_hours = $_PATCH['operating_hours'] ?? '';
    $contact_info = $_PATCH['contact_info'] ?? '';

    $sql = "UPDATE restaurant SET restaurant_name='{$restaurant_name}', 
        location='{$location}', 
        favorite_food='{$favorite_food}', operating_hours='{$operating_hours}', 
        contact_info='{$contact_info}' WHERE id='{$id}'";

    if(!mysqli_query($conn, $sql)) {
        die(mysqli_error($conn));
    }

    echo 'Updated successfully.';
}
else if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    parse_str(file_get_contents('php://input'), $_DELETE);
    
    $id = $_DELETE['id'];

    $sql = "DELETE FROM restaurant WHERE id={$id}";
    if(!mysqli_query($conn, $sql)) {
        echo mysqli_error($conn);
    }

    echo 'Deleted successfully.';
}

mysqli_close($conn);
?>