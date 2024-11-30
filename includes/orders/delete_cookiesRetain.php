<?php
// Include the config file for database connection
include "../config.php";

// Set CORS headers to allow requests from your React app
header("Access-Control-Allow-Origin: http://127.0.0.1:5500");
header("Access-Control-Allow-Methods: DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("HTTP/1.1 200 OK");
    exit;
}

try {
    // Get data from the DELETE request
    $data = json_decode(file_get_contents("php://input"), true);

    // Extract order_id from the JSON data
    $order_id = $data['order_id'];

    if (empty($order_id)) {
        throw new Exception("Order ID is required.");
    }

    // Step 1: Remove the order_id association in the cookies table
    $query = "UPDATE cookies SET order_id = NULL WHERE order_id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $order_id);

    if (!$stmt->execute()) {
        throw new Exception("Failed to dissociate cookies from the order.");
    }

    // Step 2: Delete the order from the orders table
    $query = "DELETE FROM orders WHERE order_id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $order_id);

    if (!$stmt->execute()) {
        throw new Exception("Failed to delete the order.");
    }

    // Step 3: Return success response
    echo json_encode(['message' => 'Order deleted successfully!']);

    // Close the statement
    $stmt->close();
} catch (Exception $e) {
    // Handle errors
    http_response_code(500);
    echo json_encode(['error' => 'Error: ' . $e->getMessage()]);
}

// Close the database connection
$conn->close();
?>
