<?php
// db.php - Database connection configuration
// Database host
$host = "localhost";
// Database username (change if needed)
$user = "root"; // change if needed
// Database password
$pass = "";
// Database name
$dbname = "logic_path";

// Create new MySQLi connection
$conn = new mysqli($host, $user, $pass, $dbname);

// Check for connection errors and die if failed
if ($conn->connect_error) {
    die("Database connection failed: " . $conn->connect_error);
}
?>
