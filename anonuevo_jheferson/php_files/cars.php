<?php
$server = 'localhost';
$username = 'root';
$password = '';
$db = 'dtb_cars';

$conn = mysqli_connect($server, $username, $password, $db);

if (!$conn) {
    die('Connection not found.');
} else if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $sql = "SELECT * from cars";
    
    $result = mysqli_query($conn, $sql);
    if (!$result) {
        die('Error reading from sql.');
    }

    $response = [];
    while ($row = $result->fetch_assoc()) {
        array_push($response, [
            'id' => $row['id'],
            'car_brand' => $row['car_brand'],
            'car_model' => $row['car_model'],
            'car_year' => $row['car_year'],
            'car_color' => $row['car_color'],
            'no_of_seats' => $row['no_of_seats']
        ]);
    }

    echo json_encode($response);
} else if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $car_brand = $_POST['car_brand'] ?? '';
    $car_model = $_POST['car_model'] ?? '';
    $car_year = $_POST['car_year'] ?? '';
    $car_color = $_POST['car_color'] ?? '';
    $no_of_seats = $_POST['no_of_seats'] ?? '';

    $sql = "INSERT INTO cars(car_brand, car_model, car_year, car_color, no_of_seats) 
        VALUES('{$car_brand}', '{$car_model}', '{$car_year}', '{$car_color}', '{$no_of_seats}')";

    if (!mysqli_query($conn, $sql)) {
        die(mysqli_error($conn));
    }

    echo 'Inserted successfully.';
} else if ($_SERVER['REQUEST_METHOD'] == 'PATCH') {
    parse_str(file_get_contents('php://input'), $_PATCH);

    $id = $_PATCH['id'] ?? '';
    $car_brand = $_PATCH['car_brand'] ?? '';
    $car_model = $_PATCH['car_model'] ?? '';
    $car_year = $_PATCH['car_year'] ?? '';
    $car_color = $_PATCH['car_color'] ?? '';
    $no_of_seats = $_PATCH['no_of_seats'] ?? '';

    $sql = "UPDATE cars SET car_brand='{$car_brand}', car_model='{$car_model}', car_year='{$car_year}', 
        car_color='{$car_color}', no_of_seats='{$no_of_seats}' WHERE id='{$id}'";

    if (!mysqli_query($conn, $sql)) {
        die(mysqli_error($conn));
    }

    echo 'Updated successfully.';
} else if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    parse_str(file_get_contents('php://input'), $_DELETE);

    $id = $_DELETE['id'] ?? '';

    $sql = "DELETE FROM cars WHERE id='{$id}'";

    if (!mysqli_query($conn, $sql)) {
        die(mysqli_error($conn));
    }

    echo 'Deleted successfully.';
}

mysqli_close($conn);
?>