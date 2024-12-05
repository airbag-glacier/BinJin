<?php
include 'db_connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $flavor_id = $_POST['flavor_id'];
    $order_id = $_POST['order_id'] ?? NULL;


    $flavor_check_sql = "SELECT 1 FROM flavors WHERE flavor_id = ?";
    $flavor_check_stmt = $conn->prepare($flavor_check_sql);
    $flavor_check_stmt->bind_param("i", $flavor_id);
    $flavor_check_stmt->execute();
    $flavor_check_result = $flavor_check_stmt->get_result();


    $order_check_sql = "SELECT 1 FROM orders WHERE order_id = ?";
    $order_check_stmt = $conn->prepare($order_check_sql);
    $order_check_stmt->bind_param("i", $order_id);
    $order_check_stmt->execute();
    $order_check_result = $order_check_stmt->get_result();

    if ($flavor_check_result->num_rows > 0 && $order_check_result->num_rows > 0) {

        $sql = "INSERT INTO cookies (flavor_id, order_id) VALUES (?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ii", $flavor_id, $order_id);

        if ($stmt->execute()) {
            echo "New cookie created successfully";
        } else {
            echo "Error: " . $stmt->error;
        }

        $stmt->close();
    } else {

        echo "Error: The specified flavor_id or order_id does not exist in their respective tables.";
    }

    $flavor_check_stmt->close();
    $order_check_stmt->close();


    $conn->close();
    header("Location: index.php");
    exit();
}
?>
