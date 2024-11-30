<?php
// Include the config file for database connection
include "../config.php";

// Set CORS headers to allow requests from your React app
header("Access-Control-Allow-Origin: http://127.0.0.1:5500");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("HTTP/1.1 200 OK");
    exit;
}

try {
    // Step 1: Query to fetch all orders
    $query = "SELECT * FROM orders";
    $result = $conn->query($query);

    if (!$result) {
        throw new Exception("Failed to fetch orders.");
    }

    $orders = [];
    while ($order = $result->fetch_assoc()) {
        // Step 2: Fetch cookies associated with the current order
        $order_id = $order['order_id'];

        $cookieQuery = "
            SELECT c.cookie_id, f.flavor_name 
            FROM cookies c
            JOIN flavors f ON c.flavor_id = f.flavor_id
            WHERE c.order_id = ?
        ";
        $stmt = $conn->prepare($cookieQuery);
        $stmt->bind_param("i", $order_id);
        $stmt->execute();
        $cookieResult = $stmt->get_result();

        $cookies = [];
        while ($cookie = $cookieResult->fetch_assoc()) {
            $cookies[] = $cookie;
        }

        // Add order data along with its cookies
        $orders[] = [
            'order_id' => $order['order_id'],
            'order_date_of_purchase' => $order['order_date_of_purchase'],
            'order_customer_name' => $order['order_customer_name'],
            'order_contact_number' => $order['order_contact_number'],
            'order_total_payment' => $order['order_total_payment'],
            'order_reference_number' => $order['order_reference_number'],
            'order_branch_location' => $order['order_branch_location'],
            'order_pickup_time' => $order['order_pickup_time'],
            'cookies' => $cookies
        ];

        // Free result of cookie query
        $cookieResult->free_result();
    }

    // Step 3: Return the orders with their associated cookies
    echo json_encode(['orders' => $orders]);

    // Free result of main query
    $result->free_result();
} catch (Exception $e) {
    // Handle errors
    http_response_code(500);
    echo json_encode(['error' => 'Error: ' . $e->getMessage()]);
}

// Close the database connection
$conn->close();
?>
