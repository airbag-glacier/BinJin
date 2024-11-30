<?php
include 'db_connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $flavor_id = $_POST['flavor_id'];
    $order_id = $_POST['order_id'] ?? NULL;

    $sql = "INSERT INTO cookies (flavor_id, order_id) VALUES ('$flavor_id', '$order_id')";

    if ($conn->query($sql) === TRUE) {
        echo "New cookie created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
    header("Location: index.php");
    exit();
}
?>
