<?php
$server = 'localhost';
$username = $_ENV['username'];
$password = $_ENV['password'];
$db = 'kpop';

$conn = mysqli_connect($server, $username, $password, $db);

if (!$conn) {
    die('Connection not found.');
} else if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $sql = "SELECT * from kpop";
    
    $result = mysqli_query($conn, $sql);
    if (!$result) {
        die('Error reading from sql.');
    }

    $response = [];
    while ($row = $result->fetch_assoc()) {
        array_push($response, [
            'id' => $row['id'],
            'group' => $row['group'],
            'song' => $row['song'],
            'bias' => $row['bias'],
            'debut' => $row['debut'],
            'company' => $row['company']
        ]);
    }

    echo json_encode($response);
} else if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $group = $_POST['group'] ?? '';
    $song = $_POST['song'] ?? '';
    $bias = $_POST['bias'] ?? '';
    $debut = $_POST['debut'] ?? '';
    $company = $_POST['company'] ?? '';

    $sql = "INSERT INTO kpop (`group`, `song`, `bias`, `debut`, `company`) 
        VALUES('{$group}', '{$song}', '{$bias}', '{$debut}', '{$company}')";

    if (!mysqli_query($conn, $sql)) {
        die(mysqli_error($conn));
    }

    echo 'Inserted successfully.';
} else if ($_SERVER['REQUEST_METHOD'] == 'PATCH') {
    parse_str(file_get_contents('php://input'), $_PATCH);

    $id = $_PATCH['id'] ?? '';
    $group = $_PATCH['group'] ?? '';
    $song = $_PATCH['song'] ?? '';
    $bias = $_PATCH['bias'] ?? '';
    $debut = $_PATCH['debut'] ?? '';
    $company = $_PATCH['company'] ?? '';

    $sql = "UPDATE kpop SET `group`='{$group}', `song`='{$song}', 
        `bias`='{$bias}', 
        `debut`='{$debut}', `company`='{$company}' WHERE id='{$id}'";

    if (!mysqli_query($conn, $sql)) {
        die(mysqli_error($conn));
    }

    echo 'Updated successfully.';
} else if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    parse_str(file_get_contents('php://input'), $_DELETE);

    $id = $_DELETE['id'] ?? '';

    $sql = "DELETE FROM kpop WHERE id='{$id}'";

    if (!mysqli_query($conn, $sql)) {
        die(mysqli_error($conn));
    }

    echo 'Deleted successfully.';
}

mysqli_close($conn);
?>