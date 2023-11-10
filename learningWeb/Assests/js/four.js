const wordList = [
    "moon", "star", "book", "fish", "tree", "home", "song", "lake", "bird",
    "desk", "ball", "ship", "food", "time", "toys", "cake", "door", "ball",
    "lamp", "rose", "note", "rose", "frog", "door", "bell", "face", "game",
    "bike", "corn", "milk", "oven", "road", "king", "coin", "leaf", "coat",
    "frog", "hand", "neck", "gift", "baby", "wine", "hill", "rose", "lamp",
    "star", "gold", "sand", "salt", "city", "hill", "flag", "bird", "iron",
    "worm", "hero", "tree", "root", "nail", "snap", "silk", "ring", "toes",
    "song", "flag", "lamp", "boot", "head", "rose", "pink", "moon", "door",
    "girl", "star", "face", "book", "foot", "coat", "hope", "blue", "ring"
];

  
  let currentWordIndex = 0;
  let currentWord = wordList[currentWordIndex];
  let correctAttempts = 0;
  
  function updateWord() {
      currentWordIndex++;
      if (currentWordIndex < wordList.length) {
          currentWord = wordList[currentWordIndex];
          document.getElementById("current-word").textContent = currentWord;
          correctAttempts = 0;
          pronounceFeedback(`Spell the word '${currentWord}'...`);
      } else {
          document.getElementById("current-word").textContent = "All words completed!";
          pronounceFeedback("Well done!");
      }
  }
  
  function pronounceFeedback(text) {
      responsiveVoice.speak(text, "US English Female");
  }
  
  function handleButtonClick(event) {
      const clickedLetter = event.target.textContent;
  
      // Display the clicked letter
      document.getElementById("clicked-letter").textContent = `You clicked: ${clickedLetter}`;
  
      pronounceFeedback(clickedLetter);
      if (clickedLetter === currentWord.charAt(correctAttempts)) {
          correctAttempts++;
          if (correctAttempts === currentWord.length) {
              if (correctAttempts >= 1) {
                  // Spell the word and then pronounce it
                  const wordToSpell = currentWord.split('').join(' ');
                  pronounceFeedback(`Spelling ${wordToSpell}`);
                  pronounceFeedback(`You spelled the word '${currentWord}'.`);
                  updateWord();
              }
          } else {
              pronounceFeedback(`Press the letter '${currentWord.charAt(correctAttempts)}'...`);
          }
      } else {
          pronounceFeedback("Wrong");
      }
  }
  
  document.addEventListener("DOMContentLoaded", function () {
      updateWord();
      const keyboardButtons = document.querySelectorAll(".keyboard-button");
      for (const button of keyboardButtons) {
          button.addEventListener("click", handleButtonClick);
      }
  });
  