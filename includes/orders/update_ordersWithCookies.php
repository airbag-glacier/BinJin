<?php
// Include the config file for database connection
include "../config.php";

// Set CORS headers to allow requests from your React app
header("Access-Control-Allow-Origin: http://127.0.0.1:5500");
header("Access-Control-Allow-Methods: PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("HTTP/1.1 200 OK");
    exit;
}

try {
    // Get data from the PUT request
    $data = json_decode(file_get_contents("php://input"), true);

    // Extract values from the JSON data
    $order_id = $data['order_id'];
    $order_customer_name = $data['order_customer_name'];
    $order_contact_number = $data['order_contact_number'];
    $order_total_payment = $data['order_total_payment'];
    $order_reference_number = $data['order_reference_number'];
    $order_branch_location = $data['order_branch_location'];
    $order_pickup_time = $data['order_pickup_time'];
    $cookies = $data['cookies']; // Array of flavor names for the cookies

    if (empty($order_id)) {
        throw new Exception("Order ID is required.");
    }

    // Begin a transaction
    $conn->begin_transaction();

    // Step 1: Update the order details
    $query = "
        UPDATE orders
        SET order_customer_name = ?, order_contact_number = ?, order_total_payment = ?, 
            order_reference_number = ?, order_branch_location = ?, order_pickup_time = ?
        WHERE order_id = ?
    ";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("ssssssi", $order_customer_name, $order_contact_number, $order_total_payment,
                      $order_reference_number, $order_branch_location, $order_pickup_time, $order_id);

    if (!$stmt->execute()) {
        throw new Exception("Failed to update the order.");
    }

    // Step 2: Remove all existing cookies linked to the order
    $query = "DELETE FROM cookies WHERE order_id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $order_id);

    if (!$stmt->execute()) {
        throw new Exception("Failed to remove existing cookies linked to the order.");
    }

    // Step 3: Add the new cookies
    foreach ($cookies as $flavor_name) {
        // Find the flavor_id of the current flavor
        $query = "SELECT flavor_id FROM flavors WHERE flavor_name = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("s", $flavor_name);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $flavor = $result->fetch_assoc();
            $flavor_id = $flavor['flavor_id'];

            // Add a new cookie linked to the order
            $query = "INSERT INTO cookies (flavor_id, order_id) VALUES (?, ?)";
            $stmt = $conn->prepare($query);
            $stmt->bind_param("ii", $flavor_id, $order_id);

            if (!$stmt->execute()) {
                throw new Exception("Failed to add cookie for flavor: " . $flavor_name);
            }
        } else {
            throw new Exception("Flavor not found: " . $flavor_name);
        }
    }

    // Commit the transaction
    $conn->commit();

    // Step 4: Return success response
    echo json_encode(['message' => 'Order and cookies updated successfully!']);

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
