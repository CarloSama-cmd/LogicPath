    <?php
    // beginner.php - Beginner difficulty game page
    session_start();
    // Check if player is logged in, redirect to login if not
    if (!isset($_SESSION['playerName'])) {
        header("Location: login.php");
        exit;
    }
    // Set difficulty and number of bombs for beginner level
    $difficulty = "beginner";
    $bombs = 2;
    ?>
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Logic Path: Beginner Mode</title>
    <link rel="stylesheet" href="style.css">
    <script src="script.js" defer></script>
    </head>
    <body>
    <div class="container">
        <!-- Header -->
        <header class="header beginner">
        <h1 class="title">Logic Path</h1>
        <p class="subtitle">Beginner Mode — 2 Bombs, 2 Lives</p>
        <a class="btn" href="scores.php" >Top Scores</a>
        </header>

        <!-- Game Start Section -->
        <main>
        <section id="start" class="card">
            <label><strong>Player:</strong></label><br>
            <input type="text" id="playerName" value="<?php echo htmlspecialchars($_SESSION['playerName']); ?>" readonly><br><br>
            <button class="btn beginner" onclick="startGame('<?php echo $difficulty; ?>', <?php echo $bombs; ?>)">Start Game</button>
            <a href="index.php" class="btn secondary">Back</a>
        </section>

        <!-- Game Area -->
        <section id="gameArea" style="display:none;">
            <div class="status">
            <div>Player: <strong id="playerDisplay"></strong></div>
            <div>Score: <strong id="score">0</strong></div>
            <div>Lives: <span id="lives"></span></div>
            </div>

            <!-- Grid -->
            <div id="grid" class="grid"></div>

            <!-- Question Modal -->
            <div id="modal" class="modal">
            <div class="dialog">
                <h3 id="qtext"></h3>
                <div id="choices"></div>
                <button class="btn secondary" onclick="closeModal()">Close</button>
            </div>
            </div>

            <!-- Restart & Quit Buttons -->
            <div style="margin-top:12px;">
            <button id="restartBtn" class="btn">Restart</button>
            <button id="quitBtn" class="btn secondary">Quit</button>
            </div>
        </section>
        </main>

                <!-- Custom Alert Modal -->
        <div id="alertModal" class="modal">
        <div class="dialog">
            <h3 id="alertMessage"></h3>
            <button class="btn" onclick="closeAlert()">OK</button>
        </div>
        </div>
                <!-- Game Area -->
                <div id="gameArea">
        <div id="grid"></div>
        <div id="gameOverlay"></div> <!-- Overlay for Game Over -->
        </div>



        <!-- Footer -->
        <footer class="footer">
        <small>Designed for classroom learning — Logic Path Team</small>
        </footer>
    </div>

    <!-- Display player name in status -->
    <script>
        document.addEventListener("DOMContentLoaded", () => {
        document.getElementById("playerDisplay").innerText =
            "<?php echo htmlspecialchars($_SESSION['playerName']); ?>";
        });
    </script>
    </body>
    </html>
