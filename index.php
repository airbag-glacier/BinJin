<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Cookies Database Page</title>
    <!-- Bootstrap CSS -->
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
    <h2 class="display-4" style="font-family: 'CurlyCandy';">Cookies Database Page</h2>
</div>

<!-- Display cookies in a table -->
<table class="table table-striped">
    <thead class="thead-dark">
        <tr>
            <th>Order ID</th>
            <th>Date of Purchase</th>
            <th>Customer Name</th>
            <th>Contact Number</th>
            <th>Total Payment</th>
            <th>Reference Number</th>
            <th>Branch Location</th>
            <th>Pickup Time</th>
            <th>Status</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody>
        <?php
        include 'db_connect.php';

        // Read orders data
        $sql = "SELECT * FROM orders";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                echo "<tr>";
                echo "<td>" . $row['order_id'] . "</td>";
                echo "<td>" . $row['order_date_of_purchase'] . "</td>";
                echo "<td>" . $row['order_customer_name'] . "</td>";
                echo "<td>" . $row['order_contact_number'] . "</td>";
                echo "<td>" . $row['order_total_payment'] . "</td>";
                echo "<td>" . $row['order_reference_number'] . "</td>";
                echo "<td>" . $row['order_branch_location'] . "</td>";
                echo "<td>" . $row['order_pickup_time'] . "</td>";
                if ($row['order_status'] == "0") {
                    echo "<td>Pending</td>";
                } else {
                    echo "<td>Done</td>";
                }
                
                echo "<td>
                        <a href='update.php?order_id=" . $row['order_id'] . "' class='btn btn-primary btn-sm'>Update</a>
                        <a href='delete.php?order_id=" . $row['order_id'] . "' class='btn btn-danger btn-sm'>Delete</a>
                      </td>";
                echo "</tr>";
            }
        } else {
            echo "<tr><td colspan='9'>No orders found</td></tr>";
        }

        $conn->close();
        ?>
    </tbody>
</table>


<table class="table table-striped">
    <thead class="thead-dark">
        <tr>
            <th>Cookie ID</th>
            <th>Flavor ID</th>
            <th>Order ID</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody>
        <?php
        include 'db_connect.php';
        
        // Read cookies data
        $sql = "SELECT * FROM cookies";
        $result = $conn->query($sql);
        
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                echo "<tr>";
                echo "<td>" . $row['cookie_id'] . "</td>";
                echo "<td>" . $row['flavor_id'] . "</td>";
                echo "<td>" . $row['order_id'] . "</td>";
                echo "<td>
                        <a href='update.php?cookie_id=" . $row['cookie_id'] . "' class='btn btn-primary btn-sm'>Update</a>
                        <a href='delete.php?cookie_id=" . $row['cookie_id'] . "' class='btn btn-danger btn-sm'>Delete</a>
                      </td>";
                echo "</tr>";
            }
        } else {
            echo "<tr><td colspan='4'>No cookies found</td></tr>";
        }
        $conn->close();
        ?>
    </tbody>
</table>

<h3 class="mt-4" style="font-family: 'CurlyCandy';">Add a New Cookie</h3>
<form action="create.php" method="POST">
    <div class="form-group">
        <label for="flavor_id">Flavor ID:</label>
        <input type="number" name="flavor_id" class="form-control" required>
    </div>
    <div class="form-group">
        <label for="order_id">Order ID:</label>
        <input type="number" name="order_id" class="form-control">
    </div>
    <button type="submit" class="btn btn-success">Add Cookie</button>
</form>

<!-- Bootstrap JS and dependencies -->
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>
</html>
