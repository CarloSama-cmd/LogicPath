<?php
// index.php - Main page for selecting game difficulty
session_start();
// Check if player is logged in, redirect to login if not
if (!isset($_SESSION['playerName'])) {
    header("Location: login.php");
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Logic Path: Select Difficulty</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <!-- Header -->
    <header class="header">
      <h1 class="title">Logic Path</h1>
      <p class="subtitle">IT Bomb Challenge — Choose your difficulty!</p>
              <a class="btn" href="scores.php" >Top Scores</a>

    </header>

    <!-- Difficulty Selection -->
    <main>
      <section class="card">
        <label><strong>Player:</strong></label><br>
        <input type="text" value="<?php echo htmlspecialchars($_SESSION['playerName']); ?>" readonly><br><br>

        <h2>Select Difficulty</h2>
        <div class="difficulty-buttons">
          <a href="beginner.php" class="btn beginner">Beginner<br><small>2 Bombs • 2 Lives</small></a>
          <a href="intermediate.php" class="btn intermediate">Intermediate<br><small>4 Bombs • 2 Lives</small></a>
          <a href="advance.php" class="btn advanced">Advanced<br><small>6 Bombs • 3 Lives</small></a>
        </div>

        <br>
        <a href="login.php" class="btn secondary">Log Out</a>
      </section>
    </main>

    <!-- Footer -->
    <footer class="footer">
      <small>Designed for classroom learning — Logic Path Team</small>
    </footer>
  </div>
</body>
</html>
