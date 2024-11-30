<?php
include 'db_connect.php';

$cookie_id = $_GET['cookie_id'];
$sql = "DELETE FROM cookies WHERE cookie_id=$cookie_id";

if ($conn->query($sql) === TRUE) {
    echo "Cookie deleted successfully";
} else {
    echo "Error deleting record: " . $conn->error;
}

$conn->close();
header("Location: index.php");
exit();
?>
