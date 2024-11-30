<?php
$requestUri = strtok($_SERVER['REQUEST_URI'], '?'); // Get URI without query string
$requestMethod = $_SERVER['REQUEST_METHOD'];

// Routes
$routes = [
    'GET' => [
        '/cookies' => 'includes/cookies/read_unordered_cookies.php',
        '/orders' => 'includes/orders/read.php',
    ],
    'POST' => [
        '/orders' => 'includes/orders/create.php',
    ],
    'PUT' => [

    ],
    'DELETE' => [
        '/orders' => 'includes/orders/delete.php',
    ],
];

// Match the route
if (isset($routes[$requestMethod][$requestUri])) {
    include $routes[$requestMethod][$requestUri];
} else {
    http_response_code(404);
    echo json_encode(["message" => "Route not found"]);
}
?>
