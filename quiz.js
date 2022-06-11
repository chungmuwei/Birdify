var quiz = {
  // (A) PROPERTIES
  // (A1) QUESTIONS & ANSWERS
  // Q = QUESTION, O = OPTIONS, A = CORRECT ANSWER
  data: [
  {
    // source of the bird image
    question : "What kind of woodpecker is it?",
    image : "img/White-backed Woodpecker.jpg",
    // four bird names which include only one correct answer
    options : [
      "White-backed Woodpecker Male",
      "White-backed Woodpecker Female",
      "Gray-capped Pygmy Woodpecker Male",
      "Gray-capped Pygmy Woodpecker Female"
    ],
    // index of the correct answer
    answer : 1 
  },
  {
    question : "What kind of pheasent is it?",
    image : "img/Mikado Pheasant.jpg",
    options : [
      "Mikado Pheasant",
      "Ring-necked Pheasant",
      "Swinhoe's Pheasant",
      "Indian Peafowl"
    ],
    answer : 0
  },
  {
    question : "What kind of egret is it?",
    image : "img/Cattle Egret.jpeg",
    options : [
      "Little Egret",
      "Intermediate Egret",
      "Cattle Egret",
      "Chinese Egret"
    ],
    answer : 2
  },
  {
    question : "What kind of egret is it?",
    image : "img/Intermediate Egret.jpg",
    options : [
      "Little Egret",
      "Intermediate Egret",
      "Cattle Egret",
      "Chinese Egret"
    ],
    answer : 1
  },
  {
    question : "What kind of heron is it?",
    image : "img/Grey Heron.jpg",
    options : [
      "Pacific Heron",
      "Great Blue Heron",
      "Purple Heron",
      "Grey Heron"
    ],
    answer : 3
  },
  {
    question : "What kind of grebe is it?",
    image : "img/Little Grebe.jpg",
    options : [
      "Great Crested Grebe",
      "Horned Grebe",
      "Little Grebe",
      "Red-necked Grebe"
    ],
    answer : 2
  },
  {
    question : "What kind of minivet is it?",
    image : "img/Gray-chinned Minivet.jpg",
    options : [
      "Gray-chinned Minivet Female",
      "Gray-chinned Minivet Male",
    ],
    answer : 0
  },
  {
    question : "What kind of minivet is it?",
    image : "img/Gray-chinned Minivet Male.jpeg",
    options : [
      "Gray-chinned Minivet Female",
      "Gray-chinned Minivet Male",
    ],
    answer : 1
  },
  {
    question : "What kind of niltava is it?",
    image : "img/Vivid Niltava Male.jpg",
    options : [
      "Fujian Niltava Female",
      "Fujian Niltava Male",
      "Vivid Niltava Female",
      "Vivid Niltava Male",
    ],
    answer : 3
  },
  {
    question : "What kind of shrike is it?",
    image : "img/Brown Shrike.jpg",
    options : [
      "Brown Shrike",
      "Long-tailed Shrike",
      "Bull-headed Shrike",
      "Chinese Gray Shrike",
    ],
    answer : 0
  },
  ],

  // (A2) HTML ELEMENTS
  hWrap: null, // HTML quiz container
  hQn: null, // HTML question wrapper
  hAns: null, // HTML answers wrapper

  // (A3) GAME FLAGS
  now: 0, // current question
  score: 0, // current score

  // (B) INIT QUIZ HTML
  init: (quiz_length) => {
    // (B0) Shuffle the order of the questions
    shuffle(quiz.data);
    //      slice the quiz.data array into the length user wanted
    quiz.data = quiz.data.slice(0, quiz_length)
    // (B1) WRAPPER
    quiz.hWrap = document.getElementById("quizWrap");
    
    // (B2) QUESTION SECTION
    quiz.hQn = document.createElement("div");
    quiz.hQn.id = "quizQn";
    quiz.hWrap.appendChild(quiz.hQn);

    // (B3) IMAGE SECTION
    quiz.hImg = document.createElement("img");
    quiz.hImg.id = "quizImg";
    quiz.hWrap.appendChild(quiz.hImg);

    // (B4) ANSWERS SECTION
    quiz.hAns = document.createElement("div");
    quiz.hAns.id = "quizAns";
    quiz.hWrap.appendChild(quiz.hAns);

    // (B4) GO!
    quiz.draw();
  },

  // (C) DRAW QUESTION
  draw: () => {
    // (C1) QUESTION
    quiz.hQn.innerHTML = quiz.data[quiz.now].question;

    // (C2) IMAGE
    quiz.hImg.src = quiz.data[quiz.now].image;
    quiz.hImg.width = 560;

    // (C3) OPTIONS
    quiz.hAns.innerHTML = "";
    for (let i in quiz.data[quiz.now].options) {
      let radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "quiz";
      radio.id = "quizo" + i;
      quiz.hAns.appendChild(radio);
      let label = document.createElement("label");
      label.innerHTML = quiz.data[quiz.now].options[i];
      label.setAttribute("for", "quizo" + i);
      label.dataset.idx = i;
      label.addEventListener("click", () => { quiz.select(label); });
      quiz.hAns.appendChild(label);
    }
  },

  // (D) OPTION SELECTED
  select: (option) => {
    // (D1) DETACH ALL ONCLICK
    let all = quiz.hAns.getElementsByTagName("label");
    for (let label of all) {
      label.removeEventListener("click", quiz.select);
    }

    // (D2) CHECK IF CORRECT
    let correct = option.dataset.idx == quiz.data[quiz.now].answer;
    // sound effect
    var correctSound = new Audio("sound/correct.wav")
    var wrongSound = new Audio("sound/wrong.mp3")
    if (correct) {
      quiz.score++;
      option.classList.add("correct");
      correctSound.play();
    } else {
      option.classList.add("wrong");
      wrongSound.play();
    }

    // (D3) NEXT QUESTION OR END GAME
    quiz.now++;
    setTimeout(() => {
      if (quiz.now < quiz.data.length) { quiz.draw(); }
      else {
        quiz.hQn.innerHTML = `You have answered ${quiz.score} of ${quiz.data.length} correctly.`;
        quiz.hWrap.removeChild(quiz.hImg);
        quiz.hAns.style.display = "none";
      }
    }, 1000);
  },

  // (E) RESTART QUIZ
  reset : () => {
    quiz.now = 0;
    quiz.score = 0;
    quiz.draw();
  }
};

var start_button = document.getElementById("start_button");
  
start_button.addEventListener("click", init_quiz);

function init_quiz() {
  quiz_length = document.getElementById("quiz_length").value
  if(isNaN(quiz_length) || quiz_length < 1 || quiz_length > 10) {
    return
  }
  // hide description
  document.getElementById("description").style.display = "none";
  // hide menu
  document.getElementById("menu").style.display = "none";
  // display quiz wrap
  document.getElementById("quizWrap").style.display = "block";
  // initialise quiz
  quiz.init(quiz_length);
  // remove event listener so that it only the first click initialse the quiz
  start_button.removeEventListener("click", init_quiz);
}

// Source: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
// Fisher–Yates shuffle algorithm
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}
