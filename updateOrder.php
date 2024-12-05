<?php
include 'db_connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
 
    $order_id = $_POST['order_id'];
    $order_customer_name = $_POST['order_customer_name'];
    $order_contact_number = $_POST['order_contact_number'];
    $order_total_payment = $_POST['order_total_payment'];
    $order_reference_number = $_POST['order_reference_number'];
    $order_branch_location = $_POST['order_branch_location'];
    $order_pickup_time = $_POST['order_pickup_time'];
    $order_status = $_POST['order_status']; 

   
    $sql = "
        UPDATE orders 
        SET 
            order_customer_name='$order_customer_name', 
            order_contact_number='$order_contact_number', 
            order_total_payment='$order_total_payment', 
            order_reference_number='$order_reference_number', 
            order_branch_location='$order_branch_location', 
            order_pickup_time='$order_pickup_time',
            order_status='$order_status'
        WHERE order_id=$order_id
    ";


    if ($conn->query($sql) === TRUE) {

        header("Location: binjinAdmin.php");
        exit(); 
    } else {
       
        $error = "Error updating record: " . $conn->error;
    }
}


if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $order_id = $_GET['order_id'];


    $sql = "SELECT * FROM orders WHERE order_id=$order_id";
    $result = $conn->query($sql);

  
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
    } else {
        $error = "Order not found.";
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Update Order</title>

   
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

<div class="jumbotron text-center" style="background-color: #ffb9cd;">
    <h2 class="display-4" style="font-family: 'CurlyCandy';">Update Order</h2>
</div>

<?php if (!empty($error)): ?>
    <div class="alert alert-danger mt-3"><?= $error ?></div>
<?php endif; ?>


<form action="updateOrder.php" method="POST">
    <input type="hidden" name="order_id" value="<?php echo $row['order_id']; ?>">
    <div class="form-group">
        <label for="order_customer_name" class="col-form-label">Customer Name:</label>
        <input type="text" name="order_customer_name" class="form-control" value="<?php echo $row['order_customer_name']; ?>" required>
    </div>
    <div class="form-group">
        <label for="order_contact_number" class="col-form-label">Contact Number:</label>
        <input type="text" name="order_contact_number" class="form-control" value="<?php echo $row['order_contact_number']; ?>" required>
    </div>
    <div class="form-group">
        <label for="order_total_payment" class="col-form-label">Total Payment:</label>
        <input type="number" step="0.01" name="order_total_payment" class="form-control" value="<?php echo $row['order_total_payment']; ?>" required>
    </div>
    <div class="form-group">
        <label for="order_reference_number" class="col-form-label">Reference Number:</label>
        <input type="text" name="order_reference_number" class="form-control" value="<?php echo $row['order_reference_number']; ?>" required>
    </div>
    <div class="form-group">
        <label for="order_branch_location" class="col-form-label">Branch Location:</label>
        <input type="text" name="order_branch_location" class="form-control" value="<?php echo $row['order_branch_location']; ?>" required>
    </div>
    <div class="form-group">
        <label for="order_pickup_time" class="col-form-label">Pickup Time:</label>
        <input type="text" name="order_pickup_time" class="form-control" value="<?php echo $row['order_pickup_time']; ?>" required>
    </div>
    <div class="form-group">
        <label for="order_status" class="col-form-label">Status:</label>
        <select name="order_status" class="form-control" required>
            <option value="0" <?php if ($row['order_status'] == "0") echo "selected"; ?>>Pending</option>
            <option value="1" <?php if ($row['order_status'] == "1") echo "selected"; ?>>Done</option>
        </select>
    </div>
    <button type="submit" class="btn btn-primary">Update Order</button>
</form>


<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>
</html>
