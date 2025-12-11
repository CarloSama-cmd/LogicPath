<?php
// scores.php - Displays top scores leaderboard
// Include database connection
include 'db.php';

// Query to get top 10 scores ordered by score descending, then by date ascending
$res = $conn->query("SELECT name, score, created_at FROM scores ORDER BY score DESC, created_at ASC LIMIT 10");
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Logic Path - Top Scores</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <div class="container">
    <header class="header">
      <h1 class="title">Top Scores</h1>
      <a class="btn" href="index.php">Back to Game</a>
    </header>

    <main class="card">
      <table class="scores-table">
        <thead><tr><th>Rank</th><th>Name</th><th>Score</th><th>Date</th></tr></thead>
        <tbody>
        <?php
        $i = 1;
        while ($row = $res->fetch_assoc()) {
            echo '<tr>';
            echo '<td>' . $i . '</td>';
            echo '<td>' . htmlspecialchars($row['name']) . '</td>';
            echo '<td>' . intval($row['score']) . '</td>';
            echo '<td>' . $row['created_at'] . '</td>';
            echo '</tr>';
            $i++;
        }
        ?>
        </tbody>
      </table>
    </main>
  </div>
</body>
</html>