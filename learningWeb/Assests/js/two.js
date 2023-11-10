const wordList = [
    "at", "go", "it", "my", "on", "up", "in", "an", "to", "by", 
    "we", "so", "if", "me", "is", "no", "be", "us", "as", "am", 
    "or", "he", "do", "so", "up", "of", "it", "by", "on", "at", 
    "an", "is", "we", "to", "me", "my", "in", "us", "or", "up", 
    "on", "at", "am", "he", "do", "us", "so", "it", "we", "go",
    "no", "by", "as", "if", "an", "to", "of", "or", "be", "me",
    "is", "my", "in", "so", "do", "it", "he", "up", "we", "to",
    "by", "am", "us", "on", "an", "go", "at", "if", "no"
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
    document.getElementById("clicked-letter").textContent = ` ${clickedLetter}`;
    
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







