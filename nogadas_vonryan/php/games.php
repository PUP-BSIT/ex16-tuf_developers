<?php
$server = 'localhost';
$username = $_ENV['username'];
$password = $_ENV['password'];
$db = 'games';

$conn = mysqli_connect($server, $username, $password, $db);

if(!$conn) {
    die('Connection not found.');
}
else if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $sql = "SELECT * from games";

    $result = mysqli_query($conn, $sql);
    if(!$result) {
        die('Error reading from sql.');
    }

    $response = [];
    while($row = $result->fetch_assoc()) {
        array_push($response, [
            'id' => $row['id'],
            'title' => $row['title'],
            'description' => $row['description'],
            'genre' => $row['genre'],
            'developer' => $row['developer'],
            'release_date' => $row['release_date'],
        ]);
    }
    
    echo json_encode($response);
}
else if($_SERVER['REQUEST_METHOD'] == 'POST') {
    $title = $_POST['title'] ?? '';
    $description = $_POST['description'] ?? '';
    $genre = $_POST['genre'] ?? '';
    $developer = $_POST['developer'] ?? '';
    $release_date = $_POST['release_date'] ?? '';

    $sql = "INSERT INTO games(title,description,genre,developer,release_date) 
        VALUES('{$title}', '{$description}', '{$genre}', '{$developer}', 
        '{$release_date}')";

    if(!mysqli_query($conn, $sql)) {
        die(mysqli_error($conn));
    }

    echo 'Inserted successfully.';
}
else if ($_SERVER['REQUEST_METHOD'] == 'PATCH') {
    parse_str(file_get_contents('php://input'), $_PATCH);

    $id = $_PATCH['id'] ?? '';
    $title = $_PATCH['title'] ?? '';
    $description = $_PATCH['description'] ?? '';
    $genre = $_PATCH['genre'] ?? '';
    $developer = $_PATCH['developer'] ?? '';
    $release_date = $_PATCH['release_date'] ?? '';

    $sql = "UPDATE games SET title='{$title}', description='{$description}', 
        genre='{$genre}', developer='{$developer}', 
        release_date='{$release_date}' WHERE id='{$id}'";

    if(!mysqli_query($conn, $sql)) {
        die(mysqli_error($conn));
    }

    echo 'Updated successfully.';
}
else if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    parse_str(file_get_contents('php://input'), $_DELETE);
    
    $id = $_DELETE['id'];

    $sql = "DELETE FROM games WHERE id={$id}";
    if(!mysqli_query($conn, $sql)) {
        echo mysqli_error($conn);
    }

    echo 'Deleted successfully.';
}

mysqli_close($conn);
?>