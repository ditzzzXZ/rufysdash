// Track if player found key/photo/clue for secret ending
let hasRoseKey = false;
let hasGardenPhoto = false;
let hasHiddenClue = false;

// Hint function
function showHint() {
  const hintText = document.getElementById('hint-text');
  const currentScene = document.getElementById('game-image').src.split('/').pop().split('.')[0];

  const hints = {
    'scene-1': 'Try checking all three spots — you might miss a clue!',
    'scene-2': 'Keep the photo and box — they’ll matter later.',
    'scene-3': 'The flower symbol matches something in the photo...',
    'scene-4': 'The board is loose, but prying it might be risky.',
    'scene-5': 'Look carefully under the couch — something’s hiding there.',
    'scene-6': 'The box lock has a star symbol... where have you seen that?',
    'scene-7': 'The note talks about "the third window" — which one?',
    'scene-8': 'You can still go back for the key if you don’t have it.',
    'scene-9': 'The star key fits the box — open it!',
  };

  hintText.textContent = hints[currentScene] || 'Think carefully about the clues you’ve found.';
  hintText.style.display = 'block';
  setTimeout(() => hintText.style.display = 'none', 5000); // Hide after 5s
}

// Main scene function
function goToScene(sceneId) {
  const image = document.getElementById('game-image');
  const text = document.getElementById('game-text');
  const choices = document.getElementById('choices');

  // Reset hints
  document.getElementById('hint-text').style.display = 'none';

  // --------------------------
  // SCENE 1: START
  // --------------------------
  if (sceneId === 'scene-1') {
    hasRoseKey = hasGardenPhoto = hasHiddenClue = false;
    image.src = 'assets/scene-1.jpg';
    text.innerHTML = `
      <p>Lila blinks awake. She’s on a dusty couch in a small, locked room. Windows are boarded; a single bulb flickers. A note on the coffee table reads: "Three paths, three fates. Find the truth — or be lost."</p>
      <p>What does she check first?</p>
    `;
    choices.innerHTML = `
      <button onclick="goToScene('scene-2')">Check coffee table drawer</button>
      <button onclick="goToScene('scene-3')">Walk to corner door</button>
      <button onclick="goToScene('scene-4')">Inspect boarded window</button>
    `;
  }

  // --------------------------
  // SCENE 2: COFFEE TABLE DRAWER
  // --------------------------
  else if (sceneId === 'scene-2') {
    hasGardenPhoto = true;
    image.src = 'assets/scene-2.jpg';
    text.innerHTML = `
      <p>Lila tugs open the drawer. Inside: a rusty nail, a crumpled <b>photo of a garden</b> (with a red rose and a star-shaped birdbath), and a small wrapped box with a star lock. She can’t open the box yet.</p>
      <p>She slips the photo in her pocket. What’s next?</p>
    `;
    choices.innerHTML = `
      <button onclick="goToScene('scene-3')">Check corner door</button>
      <button onclick="goToScene('scene-4')">Inspect window</button>
      <button onclick="goToScene('scene-5')">Look under couch</button>
    `;
  }

  // --------------------------
  // SCENE 3: CORNER DOOR
  // --------------------------
  else if (sceneId === 'scene-3') {
    image.src = 'assets/scene-3.jpg';
    text.innerHTML = `
      <p>The door is heavy with an iron lock. Next to it: a metal panel with a <b>rose symbol</b>. Lila thinks of the garden photo — the red rose was front and center.</p>
      <p>She can try prying the lock... or keep looking for a key.</p>
    `;
    choices.innerHTML = `
      <button onclick="goToScene('scene-8')">Pry lock with rusty nail</button>
      <button onclick="goToScene('scene-5')">Look under couch for key</button>
      <button onclick="goToScene('scene-4')">Check window for clues</button>
    `;
  }

  // --------------------------
  // SCENE 4: BOARDED WINDOW
  // --------------------------
  else if (sceneId === 'scene-4') {
    image.src = 'assets/scene-4.jpg';
    text.innerHTML = `
      <p>One board is loose. Lila tugs it off — she can see outside: a overgrown garden and three more windows. A second note is taped to the inside of the board: "The third window holds the star’s secret."</p>
      <p>She can try climbing out... or follow the note’s clue.</p>
    `;
    choices.innerHTML = `
      <button onclick="goToScene('scene-7')">Look for "third window" inside</button>
      <button onclick="goToScene('scene-8')">Climb out loose board</button>
      <button onclick="goToScene('scene-5')">Look under couch</button>
    `;
  }

  // --------------------------
  // SCENE 5: UNDER COUCH
  // --------------------------
  else if (sceneId === 'scene-5') {
    hasRoseKey = true;
    image.src = 'assets/scene-5.jpg';
    text.innerHTML = `
      <p>Lila kneels and reaches under the couch. Her fingers find a <b>brass rose-shaped key</b> — perfect for the door’s rose panel! She also spots a tiny star-shaped key tucked behind a cushion — she grabs that too.</p>
      <p>Now she has both keys. Where to go first?</p>
    `;
    choices.innerHTML = `
      <button onclick="goToScene('scene-6')">Open wrapped box with star key</button>
      <button onclick="goToScene('scene-3')">Use rose key on door</button>
      <button onclick="goToScene('scene-7')">Follow "third window" clue</button>
    `;
  }

  // --------------------------
  // SCENE 6: OPENING THE BOX
  // --------------------------
  else if (sceneId === 'scene-6') {
    hasHiddenClue = true;
    image.src = 'assets/scene-6.jpg';
    text.innerHTML = `
      <p>Lila slides the star key into the box lock — it clicks open. Inside: a small locket with a photo of a young woman and a note that reads: "I’m in the hidden room behind the third window. Find me, and we’ll escape together."</p>
      <p>She clutches the locket. Now what?</p>
    `;
    choices.innerHTML = `
      <button onclick="goToScene('scene-3')">Escape via corner door</button>
      <button onclick="goToScene('scene-7')">Find hidden room behind third window</button>
    `;
  }

  // --------------------------
  // SCENE 7: THIRD WINDOW
  // --------------------------
  else if (sceneId === 'scene-7') {
    image.src = 'assets/scene-7.jpg';
    text.innerHTML = `
      <p>Lila counts the windows inside the house: 1 (boarded), 2 (in the hall), 3 (in the back corner). She pushes the curtain aside — the wall behind it swings open to reveal a <b>hidden room</b>!</p>
      <p>What’s inside depends on if she has the locket...</p>
    `;
    choices.innerHTML = hasHiddenClue 
      ? `
        <button onclick="goToScene('ending-secret')">Step into hidden room</button>
        <button onclick="goToScene('scene-3')">Go back to escape door</button>
      ` 
      : `
        <button onclick="goToScene('scene-5')">Go find star key to open box</button>
        <button onclick="goToScene('scene-3')">Escape via door</button>
      `;
  }

  // --------------------------
  // SCENE 8: RISKY CHOICE (PRY/CLIMB)
  // --------------------------
  else if (sceneId === 'scene-8') {
    image.src = 'assets/scene-8.jpg';
    text.innerHTML = `
      <p>Lila tries to pry the lock/climb out — but the board snaps/the lock jams. A loud *CRACK* echoes: the floor creaks, and all windows are now fully boarded. The house locks down tight. She’s trapped unless she has the rose key.</p>
      <p>Does she have the key?</p>
    `;
    choices.innerHTML = hasRoseKey 
      ? `
        <button onclick="goToScene('scene-3')">Use rose key to escape</button>
      ` 
      : `
        <button onclick="goToScene('ending-bad')">Give up — no way out</button>
      `;
  }

  // --------------------------
  // ENDING 1: BAD (TRAPPED FOREVER)
  // --------------------------
  else if (sceneId === 'ending-bad') {
    image.src = 'assets/ending-bad.jpg';
    text.innerHTML = `
      <p>Lila searches every nook — nothing. The house grows cold and quiet. A whisper drifts from the shadows: "You chose haste over caution. Now you’re one of us."</p>
      <p>The bulb flickers out. She’s trapped in the quiet house forever.</p>
    `;
    choices.innerHTML = `<button onclick="goToScene('scene-1')">Try again?</button>`;
  }

  // --------------------------
  // ENDING 2: GOOD (FREEDOM ALONE)
  // --------------------------
  else if (sceneId === 'ending-good') {
    image.src = 'assets/ending-good.jpg';
    text.innerHTML = `
      <p>Lila slides the rose key into the panel — the door swings open. She steps into the sunlit garden, red roses blooming all around. The note from the table flutters in the wind, adding: "You escaped, but you missed the truth."</p>
      <p>She takes a deep breath of fresh air — free at last, but with a lingering question.</p>
    `;
    choices.innerHTML = `<button onclick="goToScene('scene-1')">Play again to find the secret?</button>`;
  }

  // --------------------------
  // ENDING 3: SECRET (FREEDOM WITH A FRIEND)
  // --------------------------
  else if (sceneId === 'ending-secret') {
    image.src = 'assets/ending-secret.jpg';
    text.innerHTML = `
      <p>Lila steps into the hidden room. A young woman — the one in the locket — sits on a chair, smiling. "You found me!" she says. "I’m Maya — this house trapped me years ago, but your curiosity broke the curse."</p>
      <p>Maya leads her to a hidden exit in the garden, where a car waits. "We’re both free now," she says. Lila looks back at the house — it crumbles into flowers and grass, gone forever.</p>
      <p>You found the truth — and a new friend.</p>
    `;
    choices.innerHTML = `<button onclick="goToScene('scene-1')">Play again to explore other paths?</button>`;
  }

  // Auto-trigger good ending if using rose key on door
  if (sceneId === 'scene-3' && hasRoseKey) {
    setTimeout(() => goToScene('
      
