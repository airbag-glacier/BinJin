<?php
// Include the config file for database connection
include "../config.php";

// Set CORS headers to allow requests from Live Server
header("Access-Control-Allow-Origin: http://127.0.0.1:5500");
header("Access-Control-Allow-Methods: DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("HTTP/1.1 200 OK");
    exit;
}

// DONE, DELETE

try {
    // Get data from the DELETE request
    $data = json_decode(file_get_contents("php://input"), true);

    // Extract order_id from the JSON data
    $order_id = $data['order_id'];

    if (empty($order_id)) {
        throw new Exception("Order ID is required.");
    }

    // Begin a transaction
    $conn->begin_transaction();

    // Step 1: Delete associated cookies
    $query = "DELETE FROM cookies WHERE order_id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $order_id);

    if (!$stmt->execute()) {
        throw new Exception("Failed to delete associated cookies.");
    }

    // Step 2: Delete the order
    $query = "DELETE FROM orders WHERE order_id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $order_id);

    if (!$stmt->execute()) {
        throw new Exception("Failed to delete the order.");
    }

    // Commit the transaction
    $conn->commit();

    // Step 3: Return success response
    echo json_encode(['message' => 'Order and associated cookies deleted successfully!']);

    // Close the statement
    $stmt->close();
} catch (Exception $e) {
    // Rollback the transaction in case of an error
    $conn->rollback();
    http_response_code(500);
    echo json_encode(['error' => 'Error: ' . $e->getMessage()]);
}

// Close the database connection
$conn->close();
?>
