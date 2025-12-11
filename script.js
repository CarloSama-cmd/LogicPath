// script.js - Game logic for Logic Path game
// Global variables
let score = 0; // Player score
let totalTiles = 0; // Total tiles based on difficulty
let bombs = []; // Bomb positions
let playerName = ''; // Player name
let questions = []; // Questions for current game
let currentDiff = ''; // Current difficulty
let bombCount = 0; // Number of bombs
let lives = 0; // Player lives
let gameOver = false; // Flag to block clicks after game over

// Start game
function startGame(diff, bombNum) {
  playerName = document.getElementById('playerName').value.trim();
  currentDiff = diff;
  bombCount = bombNum;
  gameOver = false; // reset flag
  if (!playerName) return showAlert("Please enter your name!");// Display player name
  document.getElementById('playerDisplay').innerText = playerName; // Set player name

  // Difficulty settings
  if (currentDiff === 'beginner') {// Beginner
    questions = shuffle([...beginnerQuestions]);// Shuffle questions
    totalTiles = 10;// Total tiles
    lives = 2;// Lives
    // Set bombs
  } else if (currentDiff === 'intermediate') {// Intermediate
    questions = shuffle([...intermediateQuestions]); // Shuffle questions
    totalTiles = 15;// Total tiles
    lives = 2;// Lives
    // Set bombs
  } else { // Advanced
    questions = shuffle([...advancedQuestions]); // Shuffle questions
    totalTiles = 18;// Total tiles
    lives = 3; // Lives
  }
// Reset score
  score = 0;
  document.getElementById('score').innerText = score;
  renderLives();
  document.getElementById('start').style.display = 'none';
  document.getElementById('gameArea').style.display = 'block';
  buildGrid();
}

// Render hearts
function renderLives() {
  document.getElementById('lives').innerHTML = '❤️'.repeat(lives);
}

// Build grid
function buildGrid() {
  const gridEl = document.getElementById('grid');
  gridEl.innerHTML = '';
  bombs = pickBombs(totalTiles, bombCount);
// Create tiles
  for (let i = 0; i < totalTiles; i++) { // Create tiles
    const t = document.createElement('div'); // Create tile element
    t.className = 'tile'; // Set class
    t.dataset.index = i; // Set index
    t.innerText = i + 1;
    t.addEventListener('click', onTileClick);
    gridEl.appendChild(t);
  }
}

// Random bomb positions
function pickBombs(total, count) {
  let arr = []; // Array to hold bomb positions
  while (arr.length < count) {// While we need more bombs
    let pos = Math.floor(Math.random() * total);
    if (!arr.includes(pos)) arr.push(pos); // Add unique bomb position
  }
  return arr;
}

// Shuffle array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Tile click
function onTileClick(e) {
  if (gameOver) return; // <-- block clicks after game over
  const idx = +e.target.dataset.index; // Get tile index
  if (e.target.classList.contains('revealed') || e.target.classList.contains('bomb') || e.target.classList.contains('wrong')) return; // Ignore if already revealed
// Check for bomb
  if (bombs.includes(idx)) {
    e.target.classList.add('bomb');
    e.target.innerText = '💣';
    hitBomb(e.target); // Handle bomb hit
  } else {
    openQuestion(idx, e.target); // Open question modal
  }
}

// Open question modal
function openQuestion(idx, tile) {
  if (gameOver) return;
// Load question
  const q = questions[idx % questions.length];
  document.getElementById('qtext').innerText = q.q;
// Load choices
  const c = document.getElementById('choices');
  c.innerHTML = '';
// Create choice elements
  q.choices.forEach((ch, i) => {
    const d = document.createElement('div');
    d.className = 'choice';
    d.innerText = ch;
    d.onclick = () => checkAnswer(i, q.a, tile);
    c.appendChild(d);
  });
// Show modal
  document.getElementById('modal').style.display = 'flex';
}
// Close modal
function closeModal() {
  document.getElementById('modal').style.display = 'none';
}

// Check answer
function checkAnswer(i, a, tile) {
  if (gameOver) return;
// Correct answer
  if (i === a) { // Correct answer
    tile.classList.add('revealed'); // Mark as revealed
    tile.innerText = '✔'; // Correct mark
    score += 10; // Increase score
    document.getElementById('score').innerText = score; // Update score display
    showAlert('✅ Correct! Well done. Score: ' + score);// Show success alert
  } else { // Wrong answer
    tile.classList.add('wrong'); // Mark as wrong
    tile.innerText = '❌';// Wrong mark 
    showAlert('❌ Wrong answer! You lost a life.'); // Show failure alert
    hitBomb(tile);
  }

  closeModal();

  // Win condition
  const revealed = document.querySelectorAll('.tile.revealed').length;
  if (revealed === (totalTiles - bombs.length)) {
    gameOver = true;
    setTimeout(() => {
      showAlert('🎉 Congratulations! You cleared the Logic Path. Final score: ' + score);
      saveScore();
    }, 100);
  }
}

// Bomb hit
function hitBomb(tile) {
  lives--;
  renderLives();
// Check lives
  if (lives > 0) {
    showAlert('⚠️ Boom! Lives left: ' + lives);
    return;
  }

  // GAME OVER
  gameOver = true; // <-- stop all interactions
  revealAllBombs();
// Show game over message
  showAlert(`
    💀 No lives left. Game Over.<br>
    Final Score: ${score}
  `);
}

// Reveal all bombs when game over
function revealAllBombs() {
  bombs.forEach(idx => { // Reveal each bomb
    const t = document.querySelector(`.tile[data-index='${idx}']`);
    if (t && !t.classList.contains('bomb')) { // If not already revealed
      t.classList.add('bomb'); // Mark as bomb
      t.innerText = '💣';
    }
  });

  // Disable all tiles
  document.querySelectorAll('.tile').forEach(t => {
    t.style.pointerEvents = 'none'; // Disable clicks
  });
}

// ─────────── Restart & Quit Buttons ───────────
document.addEventListener("DOMContentLoaded", () => {
  const restartBtn = document.getElementById("restartBtn");
  if (restartBtn) { // Restart game
    restartBtn.addEventListener("click", () => { // On restart
      gameOver = false; // Reset game over flag
// Reset variables
      score = 0;
      document.getElementById("score").innerText = "0"; // Reset score
// Clear grid
      document.getElementById("grid").innerHTML = ""; // Clear grid
// Hide modal
      document.getElementById("modal").style.display = "none";  // Hide question modal
// Reset lives based on difficulty
      lives = (currentDiff === 'beginner') ? 2 : // 2 lives for beginner
              (currentDiff === 'intermediate') ? 2 : 3; // 2 for intermediate, 3 for advanced
// Re-render lives and rebuild grid
      renderLives(); // Render lives
      buildGrid(); // Rebuild grid
    });
  }
// Quit button
  const quitBtn = document.getElementById("quitBtn");
  if (quitBtn) { // Quit game
    quitBtn.addEventListener("click", () => {// On quit
      gameOver = true;// Set game over
      document.getElementById("gameArea").style.display = "none";// Hide game area
      document.getElementById("start").style.display = "block"; //  Show start screen
// Reset variables
      score = 0;
      lives = 0;
// Reset display
      document.getElementById("score").innerText = "0";// Reset score
      document.getElementById("lives").innerHTML = ""; // Clear lives
      document.getElementById("grid").innerHTML = "";// Clear grid
    });
  }
});

// Save score
function saveScore() { // Save score to server
  fetch('save_score.php', {
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: `name=${encodeURIComponent(playerName)}&score=${score}&difficulty=${currentDiff}`
  }).catch(e => console.log('save failed', e));

  setTimeout(() => location.reload(), 500);
}

// Custom Alert
function showAlert(message) {
  document.getElementById('alertMessage').innerHTML = message;
  document.getElementById('alertModal').style.display = 'flex';
}

function closeAlert() {
  document.getElementById('alertModal').style.display = 'none';
}
/* -------------------- QUESTIONS -------------------- */

const beginnerQuestions = [
  { q: 'What does HTML stand for?', choices:['HyperText Markup Language','How to make Lumpia','Hyperlinks and Text Markup','HighText Machine Language'], a:0 },
  { q: 'Which language is mainly used for styling web pages?', choices:['JavaScript','CSS','Python','SQL'], a:1 },
  { q: 'Which tag inserts an image in HTML?', choices:['<img>','<image>','<src>','<picture>'], a:0 },
  { q: 'Which loop runs a predetermined number of times?', choices:['while','for','if','switch'], a:1 },
  { q: 'What symbol starts an HTML comment?', choices:['<!--','//','#','/*'], a:0 },
  { q: 'Which is a database language?', choices:['HTML','CSS','SQL','SVG'], a:2 },
  { q: 'Which company developed Windows?', choices:['Apple','Microsoft','Google','IBM'], a:1 },
  { q: 'HTML tag for a hyperlink?', choices:['<a>','<link>','<href>','<url>'], a:0 },
  { q: 'Valid CSS property?', choices:['font-color','text-size','background-color','font-weight-bold'], a:2 },
  { q: 'Brain of the computer?', choices:['CPU','RAM','Hard Drive','Monitor'], a:0 }
];

const intermediateQuestions = [
  { q:'2 + 2 * 3 = ?', choices:['12','8','10','6'], a:2 },
  { q:'Strict equality operator?', choices:['==','===','!=','=>'], a:1 },
  { q:'Add item to end of array?', choices:['shift()','pop()','push()','unshift()'], a:2 },
  { q:'CSS stands for?', choices:['Cascading Style Sheets','Computer Style Syntax','Creative Style Sheets','Coded Style Sheets'], a:0 },
  { q:'Visible page content is in?', choices:['<head>','<body>','<html>','<meta>'], a:1 },
  { q:'404 means?', choices:['200','301','404','500'], a:2 },
  { q:'Print to console?', choices:['echo()','print()','log()','console.log()'], a:3 },
  { q:'CSS property for text size?', choices:['font-size','text-style','font-weight','text-transform'], a:0 },
  { q:'Link destination attribute?', choices:['href','src','alt','link'], a:0 },
  { q:'Keyword for constant?', choices:['var','let','const','static'], a:2 }
];

const advancedQuestions = [
  { q:'Binary search complexity?', choices:['O(n)','O(log n)','O(n log n)','O(1)'], a:1 },
  { q:'HTTP method to create resource?', choices:['GET','POST','PUT','DELETE'], a:1 },
  { q:'Foreign key purpose?', choices:['Speed up queries','Enforce integrity','Encrypt data','Store blobs'], a:1 },
  { q:'ID selector in CSS?', choices:['.id','#id','*id','id'], a:1 },
  { q:'“this” inside a method refers to?', choices:['Current object','Global object','Parent class','None'], a:0 },
  { q:'SQL filter rows?', choices:['ORDER BY','GROUP BY','WHERE','HAVING'], a:2 },
  { q:'API means?', choices:['Application Programming Interface','Automated Processing Input','Applied Program Interaction','Advanced Protocol Integration'], a:0 },
  { q:'Join returning all rows?', choices:['INNER','LEFT','RIGHT','FULL OUTER'], a:3 },
  { q:'typeof null?', choices:['null','undefined','object','string'], a:2 },
  { q:'O(1) means?', choices:['Constant time','Linear time','Logarithmic','Quadratic'], a:0 }
];
