<?php
// save_score.php - Saves player score to database
// Include database connection
include 'db.php';

// Get name and score from POST data, with defaults
$name = isset($_POST['name']) ? $_POST['name'] : '';
$score = isset($_POST['score']) ? intval($_POST['score']) : 0;

// If name is not empty, insert score into database
if ($name !== '') {
    // Prepare and execute insert statement
    $stmt = $conn->prepare("INSERT INTO scores (name, score) VALUES (?, ?)");
    $stmt->bind_param("si", $name, $score);
    $stmt->execute();
    $stmt->close();
}

// Close database connection
$conn->close();
?>
