<?php
// login.php - Handles player login and session initialization
// Start session to store player name
session_start();

// Check if form is submitted via POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get and trim the player name from form input
    $name = trim($_POST['playerName']);

    // If name is not empty, store in session and redirect to index
    if ($name !== '') {
        $_SESSION['playerName'] = $name;
        header("Location: index.php");
        exit;
    } else {
        // Set error message if name is empty
        $error = "Please enter your name to start.";
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Logic Path - Login</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
    
<div class="container">
    <h1 class="title">Logic Path</h1>
    <p class="subtitle">IT Bomb Challenge — Find the right steps, unlock the way!</p>

    <div class="card">
    <form method="POST" action="">
        <div class="login">
        <label for="playerName"><strong>Enter your name to begin:</strong></label><br>
        <input type="text" id="playerName" name="playerName" placeholder="Your name here..." required>
        <br><br>
        <button type="submit" class="btn secondary">Start Game</button>

        </div>
        
    </form>

    <?php if (!empty($error)): ?>
        <p style="color: #ffcccc; margin-top: 10px;"><?= $error ?></p>
    <?php endif; ?>
    </div>

    <footer class="footer">
    <small>Designed for classroom learning — Logic Path Team</small>
    </footer>
</div>
</body>
</html>
