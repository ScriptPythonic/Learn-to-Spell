const wordList = [
    "cat", "dog", "bat", "sky", "sun", "hot", "red", "fun", "big", "box",
    "joy", "sky", "toy", "leg", "hat", "top", "map", "pen", "cup", "lip",
    "bed", "bug", "fan", "nut", "jar", "rug", "tap", "run", "jet", "dig",
    "fox", "pot", "web", "log", "bus", "kit", "rod", "mud", "gem", "peg",
    "pin", "cap", "pan", "bus", "car", "bee", "ant", "tie", "gas", "set",
    "win", "sky", "van", "kid", "fix", "odd", "dry", "ink", "joy", "pot",
    "rod", "zap", "sun", "tag", "zip", "job", "owl", "cut", "toy", "pet",
    "key", "jam", "new", "lot", "gun", "nap", "lap", "ice", "hat", "sky"
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
