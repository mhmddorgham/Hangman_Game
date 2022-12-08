//generate Letters:
const letters = "abcdefghijklmnopqrstuvwxyz";

//get array from the variable:
let arrayLetters = Array.from(letters);


//catch the letters div
let LettersContainer = document.querySelector(".letters");

//generate letters
arrayLetters.forEach(letter => {
  //create a span
  let spanLetter = document.createElement("span");
  //create a txt node, and add each letter inside it:
  let myLetter = document.createTextNode(letter);
  //append the letter to span
  spanLetter.appendChild(myLetter);

  //add class to span:
  spanLetter.className = "Letter-box";

  //add the span letters to the contianer:
  LettersContainer.appendChild(spanLetter);
});

//Using Random to get the type of the word:

//Create an object called words:
const words = {
  programming: ["java", "C++", "JavaScript", "HTML", "CSS", "Python"],
  movies: ["Spider Man", "Bat Man", "Red Notice", "Adventure", "grayman"],
  people: ["Mohammed", "Adam Smith", "Alexander", "Ghandi"],
  countries: ["UAE", "Qatar", "Suadi Arebia", "Egypt", "Oman"]
};


//get all variables in the object
let allkeys = Object.keys(words);
//generate random index for the categories:
let randomIndex = Math.floor(Math.random() * allkeys.length);
//generate randomName using random index:
let randomName = allkeys[randomIndex];
// access the array of the current word:
let randomNameValues = words[randomName];
//generate a random index inside the array from a current word:
let randomValuesIndex = Math.floor(Math.random() * randomNameValues.length);
// generate a value using the index inside the array from a current word:
let randomValue = randomNameValues[randomValuesIndex];
console.log(randomValue);

document.querySelector(".game-info .category span").innerHTML = randomName;

//create an array from the random value:
let chosenWord = Array.from(randomValue.toLowerCase());
console.log(chosenWord);

//catch the guss word div:
let guessLetters = document.querySelector(".letters-guess");

chosenWord.forEach((letter) => {
  //create a span for each letter:
  let span = document.createElement("span");
  if (letter == " ") {
    //add class the the empty space:
    span.className = "with-space";
  }
  guessLetters.appendChild(span);

});


let hangMan = document.querySelector(".hangman-draw");
let attempts = 0;
let wrdLength = 0;


document.addEventListener("click", function (e) {
  // is the letter correct
  let isCorrect = false;
  //Add class clicked to the clicked elements
  e.target.classList.add("clicked");
  //set the clicked ele to a variable
  let clickedL = e.target.innerHTML;
  // check if clicked letter matches chosen word letter
  chosenWord.forEach((letter, i) => {
    if (clickedL === letter) {
      //Create an array from all span in the guess letter, and loop on all of them
      Array.from(document.querySelectorAll(".letters-guess span")).forEach((ele, index) => {
        //if span index matches the index of chosen word
        if (index === i) {
          //set the status to true
          isCorrect = true;
          // add the letter to the current index:
          ele.innerHTML = clickedL.toUpperCase();
          wrdLength++;
        }
      });
    }
  });

  if (!isCorrect) {
    attempts++;
    hangMan.classList.add(`attempt-${attempts}`);

    document.getElementById("fail").play();
  }

  else {
    document.getElementById("success").play();
  }

  if (attempts === 8) {
    LettersContainer.classList.add("finished");
    looser();

  }

  if (wrdLength === document.querySelectorAll(".letters-guess span").length) {
    Winner();
  }
});

let overMsg = document.querySelector(".gameOver");
let correctWord = document.querySelector(".CorrectW");

function looser() {
  overMsg.style.cssText = "margin: 50px auto;text-align: center;font-size: 60px;font-weight: bold; color: red; "
  correctWord.style.cssText = "margin: 40px auto;text-align: center;font-size: 20px;font-weight: bold;"
  document.getElementById("over").play();
  overMsg.innerHTML = `Game Over!`;
  correctWord.innerHTML = `Correct Word is ${randomValue}`;
}

function Winner() {
  overMsg.style.cssText = "margin: 50px auto;text-align: center;font-size: 60px;font-weight: bold; color:green; "
  correctWord.style.cssText = "margin: 40px auto;text-align: center;font-size: 20px;font-weight: bold;"
  document.getElementById("win").play();
  overMsg.innerHTML = `Winner!`;
  correctWord.innerHTML = `Correct Word is ${randomValue}`;
}