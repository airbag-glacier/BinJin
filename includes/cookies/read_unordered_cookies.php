<?php
// Include the config file for database connection
include "../config.php";

// Set CORS headers to allow requests from your React app
header("Access-Control-Allow-Origin: http://127.0.0.1:5500");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("HTTP/1.1 200 OK");
    exit;
}

try {
    // SQL query to retrieve cookies without an order_id and their flavor names
    $query = "
        SELECT cookies.cookie_id, flavors.flavor_name
        FROM cookies
        INNER JOIN flavors ON cookies.flavor_id = flavors.flavor_id
        WHERE cookies.order_id IS NULL
    ";

    // Execute the query
    $stmt = $conn->prepare($query);
    $stmt->execute();
    $result = $stmt->get_result();
    $cookies = $result->fetch_all(MYSQLI_ASSOC);

    // Return the results as JSON
    header('Content-Type: application/json');
    http_response_code(200);
    echo json_encode($cookies);

} catch (Exception $e) {
    // Handle errors
    http_response_code(500);
    echo json_encode(['error' => 'Failed to retrieve data: ' . $e->getMessage()]);
}

// Close the connection
$conn->close();
?>
