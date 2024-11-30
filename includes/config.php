<?php

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

// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "binjin_cookies";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>