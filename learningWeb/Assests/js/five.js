const wordList = [
    "table", "apple", "happy", "smile", "zebra", "music", "quick", "candy", "dance",
    "grape", "tiger", "wrist", "ocean", "giant", "robot", "lemon", "jelly", "horse",
    "panda", "fruit", "smoke", "piano", "beach", "peace", "clock", "heart", "brain",
    "ruler", "globe", "crown", "glass", "couch", "chair", "knife", "shark", "wheel",
    "cloud", "plant", "swirl", "train", "storm", "badge", "laser", "maple", "peace",
    "snake", "happy", "river", "queen", "brush", "ghost", "trick", "fairy", "water",
    "magic", "wings", "arrow", "flute", "badge", "toast", "sugar", "cable", "spoon",
    "mouse", "lunar", "light", "dolphin", "planet", "orange", "monkey", "banana",
    "lucky", "angel", "tiger", "music", "dance", "happy", "apple", "spark", "river",
    "flame", "joker", "fable", "wrist", "table", "clock", "stars", "light", "magic",
    "rocks", "crown", "heart", "glass", "chess", "horse", "cloud", "peace", "brain",
    "ruler", "brush", "knife", "shark", "wings", "ghost", "swirl", "plant", "quick"
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
  