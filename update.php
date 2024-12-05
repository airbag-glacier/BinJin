<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Update Cookie</title>

    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <style>
        @font-face {
            font-family: "CurlyCandy";
            src: url("font/CurlyCandy.ttf") format("truetype");
        }
        @font-face {
            font-family: "ComicBold";
            src: url("font/ComicBold.ttf") format("truetype");
        }
        @font-face {
            font-family: "ComicRegular";
            src: url("font/ComicRegular.ttf") format("truetype");
        }
        body {
            overflow-x: hidden;
            background-color: #f8f2ec;
            font-family: 'ComicRegular';
        }
    </style>
</head>
<body class="container mt-4">

<?php
include 'db_connect.php';

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    if (isset($_GET['cookie_id'])) {
        $cookie_id = $_GET['cookie_id'];
        $sql = "SELECT * FROM cookies WHERE cookie_id=?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $cookie_id);
        $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
        $stmt->close();
    }
}
?>

<div class="jumbotron text-center" style="background-color: #ffb9cd;">
    <h2 class="display-4" style="font-family: 'CurlyCandy';">Update Cookie</h2>
</div>

<form action="update.php" method="POST">
    <input type="hidden" name="cookie_id" value="<?php echo $row['cookie_id']; ?>">
    <div class="form-group">
        <label for="flavor_id" class="col-form-label">Flavor ID:</label>
        <input type="number" name="flavor_id" class="form-control" value="<?php echo $row['flavor_id']; ?>" required>
    </div>
    <div class="form-group">
        <label for="order_id" class="col-form-label">Order ID:</label>
        <input type="number" name="order_id" class="form-control" value="<?php echo $row['order_id']; ?>">
    </div>
    <button type="submit" class="btn btn-primary">Update Cookie</button>
</form>

<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['cookie_id']) && isset($_POST['flavor_id']) && isset($_POST['order_id'])) {
        $cookie_id = $_POST['cookie_id'];
        $flavor_id = $_POST['flavor_id'];
        $order_id = $_POST['order_id'];

        // Validate if the new flavor_id exists
        $flavor_check_sql = "SELECT 1 FROM flavors WHERE flavor_id=?";
        $flavor_check_stmt = $conn->prepare($flavor_check_sql);
        $flavor_check_stmt->bind_param("i", $flavor_id);
        $flavor_check_stmt->execute();
        $flavor_check_result = $flavor_check_stmt->get_result();

        // Validate if the new order_id exists
        $order_check_sql = "SELECT 1 FROM orders WHERE order_id=?";
        $order_check_stmt = $conn->prepare($order_check_sql);
        $order_check_stmt->bind_param("i", $order_id);
        $order_check_stmt->execute();
        $order_check_result = $order_check_stmt->get_result();

        if ($flavor_check_result->num_rows > 0 && $order_check_result->num_rows > 0) {
            // Both flavor_id and order_id exist, proceed with the update
            $update_sql = "UPDATE cookies SET flavor_id=?, order_id=? WHERE cookie_id=?";
            $update_stmt = $conn->prepare($update_sql);
            $update_stmt->bind_param("iii", $flavor_id, $order_id, $cookie_id);

            if ($update_stmt->execute()) {
                echo "<div class='alert alert-success mt-3'>Cookie updated successfully</div>";
            } else {
                echo "<div class='alert alert-danger mt-3'>Error updating record: " . $conn->error . "</div>";
            }

            $update_stmt->close();
        } else {
            echo "<div class='alert alert-danger mt-3'>Error: The specified flavor_id or order_id does not exist.</div>";
        }

        $flavor_check_stmt->close();
        $order_check_stmt->close();
    } else {
        echo "<div class='alert alert-danger mt-3'>Error: Missing required POST parameters.</div>";
    }
    $conn->close();
    header("Location: index.php");
    exit();
}
?>

<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>
</html>
