<?php
// Include the config file for database connection
include "../config.php";

// Set CORS headers to allow requests from your React app
header("Access-Control-Allow-Origin: http://127.0.0.1:5500");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("HTTP/1.1 200 OK");
    exit;
}

try {
    // Get data from the POST request
    $data = json_decode(file_get_contents("php://input"), true);

    // Extract values from the JSON data
    $order_customer_name = $data['order_customer_name'];
    $order_contact_number = $data['order_contact_number'];
    $order_total_payment = $data['order_total_payment'];
    $order_reference_number = $data['order_reference_number'];
    $order_branch_location = $data['order_branch_location'];
    $order_pickup_time = $data['order_pickup_time'];
    $cookies = $data['cookies'];  // This will contain an array of flavor names

    // Step 1: Create a new order in the orders table
    $query = "
        INSERT INTO orders (order_customer_name, order_contact_number, order_total_payment, order_reference_number, order_branch_location, order_pickup_time)
        VALUES (?, ?, ?, ?, ?, ?)
    ";

    // Prepare the SQL statement
    $stmt = $conn->prepare($query);
    // Bind the parameters
    $stmt->bind_param("ssssss", $order_customer_name, $order_contact_number, $order_total_payment, $order_reference_number, $order_branch_location, $order_pickup_time);
    
    // Execute the query to insert the order
    if ($stmt->execute()) {
        $order_id = $stmt->insert_id;  // Get the newly created order_id
    } else {
        throw new Exception("Failed to create order.");
    }

    // Step 2: Update cookies based on the provided flavors
    foreach ($cookies as $flavor_name) {
        // Find the flavor_id of the current flavor
        $query = "SELECT flavor_id FROM flavors WHERE flavor_name = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("s", $flavor_name);
        $stmt->execute();
        $result = $stmt->get_result();
        
        // Check if the flavor exists
        if ($result->num_rows > 0) {
            $flavor = $result->fetch_assoc();
            $flavor_id = $flavor['flavor_id'];

            // Step 3: Update the first matching cookie's order_id to the new order_id
            $query = "
                UPDATE cookies
                SET order_id = ?
                WHERE flavor_id = ? AND order_id IS NULL
                LIMIT 1
            ";

            $stmt = $conn->prepare($query);
            $stmt->bind_param("ii", $order_id, $flavor_id);

            if (!$stmt->execute()) {
                throw new Exception("Failed to update cookies for flavor: " . $flavor_name);
            }
        } else {
            throw new Exception("Flavor not found: " . $flavor_name);
        }
    }

    // Step 4: Return success response with the new order ID
    echo json_encode(['message' => 'Order created successfully!', 'order_id' => $order_id]);

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
