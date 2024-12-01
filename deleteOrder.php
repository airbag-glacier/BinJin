<?php
include 'db_connect.php';


if (isset($_GET['order_id'])) {
    $order_id = $_GET['order_id'];

 
    $conn->begin_transaction();

    try {
 
        $stmt1 = $conn->prepare("DELETE FROM cookies WHERE order_id = ?");
        $stmt1->bind_param("i", $order_id);
        $stmt1->execute();

 
        $stmt2 = $conn->prepare("DELETE FROM orders WHERE order_id = ?");
        $stmt2->bind_param("i", $order_id);
        $stmt2->execute();

       
        $conn->commit();

        $stmt1->close();
        $stmt2->close();
        $conn->close();

        header("Location: index.php");
        exit();
    } catch (Exception $e) {
      
        $conn->rollback();
        echo "Error deleting order: " . $e->getMessage();
    }
} 
?>
