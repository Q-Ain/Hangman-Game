window.onload = function () {

  var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
    'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
    't', 'u', 'v', 'w', 'x', 'y', 'z'];

  var categories;         // Array of topics
  var chosenCategory;     // Selected catagory
  // var getHint;          // Word getHint
  var word;              // Selected word
  var guess;             // guess
  var guesses = [];      // Stored guesses
  var lives;             // Lives
  var counter;           // Count correct guesses
  var space;              // Number of spaces in word '-'
  // added
  var numRounds;
  var correctWord;

  // Get elements
  var showRound = document.getElementById("myrounds");
  var showClue = document.getElementById("clue");

  // create alphabet ul
  var buttons = function () {
    myButtons = document.getElementById('buttons');
    letters = document.createElement('ul');

    for (var i = 0; i < alphabet.length; i++) {
      letters.id = 'alphabet';
      list = document.createElement('li');
      list.id = 'letter';
      list.innerHTML = alphabet[i];
      check();
      myButtons.appendChild(letters);
      letters.appendChild(list);
    }
  }


  // Select Catagory
  var selectCat = function () {
    if (chosenCategory === categories[0]) {
      catagoryName.innerHTML = "Category: Flowers";
    } else if (chosenCategory === categories[1]) {
      catagoryName.innerHTML = "Category: Sports";
    } else if (chosenCategory === categories[2]) {
      catagoryName.innerHTML = "Category: Colours";
    }
  }

  // Create guesses ul
  result = function () {
    wordHolder = document.getElementById('hold');
    correct = document.createElement('ul');

    for (var i = 0; i < word.length; i++) {
      correct.setAttribute('id', 'my-word');
      guess = document.createElement('li');
      guess.setAttribute('class', 'guess');
      if (word[i] === "-") {
        guess.innerHTML = "-";
        space = 1;
      } else {
        guess.innerHTML = "_";
      }

      guesses.push(guess);
      wordHolder.appendChild(correct);
      correct.appendChild(guess);
    }
  }

  // Show lives
  comments = function () {
    if (lives < 1) {
      showRound.innerHTML = "Game Over";
    }

    for (var i = 0; i < guesses.length; i++) {
      if (counter + space === guesses.length) {
        correctWord = true;
      }
    }

    if (correctWord === true) {
      numRounds += 1;
        // each time win, change to next round
        if (numRounds == 5) {
          showRound.innerHTML = "Congratulations! You've guess all the words correctly " + numRounds;
          numRounds = 0;
        } else if (numRounds > 5) {
          numRounds = 0;
        } else {
          showRound.innerHTML = "Great job! You've guessed " + numRounds + "/5 rounds";

          // clear for next round
          correct.parentNode.removeChild(correct);
          letters.parentNode.removeChild(letters);
          showClue.innerHTML = "";
          context.clearRect(0, 0, 400, 400);

          categories = [
            ["sunflower", "rose", "lily", "daisy", "lavender"],
            ["volleyball", "basketball", "golf", "swimming", "tennis"],
            ["indigo", "aquamarine", "maroon", "mustard", "vermilion"]
          ];
      
          chosenCategory = categories[Math.floor(Math.random() * categories.length)];
          word = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];
          word = word.replace(/\s/g, "-");
          console.log(word);
          buttons();
      
          guesses = [];
          lives = 10;
          counter = 0;
          space = 0;
          result();
          selectCat();
          canvas();
        }
        // console.log(numRounds);
    }

    correctWord = false; 
  }

  // Animate man
  var animate = function () {
    var drawMe = lives;
    drawArray[drawMe]();
  }


  // Hangman
  canvas = function () {

    myStickman = document.getElementById("stickman");
    context = myStickman.getContext('2d');
    context.beginPath();
    context.strokeStyle = "#fff";
    context.lineWidth = 2;
  };

  head = function () {
    myStickman = document.getElementById("stickman");
    context = myStickman.getContext('2d');
    context.beginPath();
    context.arc(60, 25, 10, 0, Math.PI * 2, true);
    context.stroke();
  }

  draw = function ($pathFromx, $pathFromy, $pathTox, $pathToy) {
    context.moveTo($pathFromx, $pathFromy);
    context.lineTo($pathTox, $pathToy);
    context.stroke();
  }

  frame1 = function () {
    draw(0, 150, 150, 150);
  };

  frame2 = function () {
    draw(10, 0, 10, 600);
  };

  frame3 = function () {
    draw(0, 5, 70, 5);
  };

  frame4 = function () {
    draw(60, 5, 60, 15);
  };

  torso = function () {
    draw(60, 36, 60, 70);
  };

  rightArm = function () {
    draw(60, 46, 100, 50);
  };

  leftArm = function () {
    draw(60, 46, 20, 50);
  };

  rightLeg = function () {
    draw(60, 70, 100, 100);
  };

  leftLeg = function () {
    draw(60, 70, 20, 100);
  };

  drawArray = [rightLeg, leftLeg, rightArm, leftArm, torso, head, frame4, frame3, frame2, frame1];


  // OnClick Function
  check = function () {
    list.onclick = function () {
      var guess = (this.innerHTML);
      this.setAttribute("class", "active");
      this.onclick = null;
      for (var i = 0; i < word.length; i++) {
        if (word[i] === guess) {
          guesses[i].innerHTML = guess;
          counter += 1;
        }
      }
      var j = (word.indexOf(guess));
      if (j === -1) {
        lives -= 1;
        comments();
        animate();
      } else {
        comments();
      }
    }
  }

  // Play
  play = function () {
    categories = [
      ["sunflower", "rose", "lily", "daisy", "lavender"],
      ["volleyball", "basketball", "golf", "swimming", "tennis"],
      ["indigo", "aquamarine", "maroon", "mustard", "vermilion"]
    ];

    chosenCategory = categories[Math.floor(Math.random() * categories.length)];
    word = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];
    word = word.replace(/\s/g, "-");
    console.log(word);
    buttons();

    guesses = [];
    lives = 10;
    counter = 0;
    space = 0;
    numRounds = 0; 
    showClue.innerHTML = "";
    showRound.innerHTML = "You've guessed 0/5 rounds";
    result();
    comments();
    selectCat();
    canvas();
  }

  play();

  // Hint
  hint.onclick = function () {

    hints = [
      ["has seeds that can be eaten", "fifty of them signifies unconditional love", "a song by Alan Walker", "a character in Micky Mouse Clubhouse", "an MRT station in Singapore"],
      ["Haikyu!!", "Kuroko no Basuke", "Birdie Wing", "Free!", "Rafael Nadal"],
      ["colour in a rainbow", "water + sea", "part of a band's name", "condiment", "name of a city in Pokemon"]
    ];

    var catagoryIndex = categories.indexOf(chosenCategory);
    var hintIndex = chosenCategory.indexOf(word);
    showClue.innerHTML = "Hint: " + hints[catagoryIndex][hintIndex];
  };

  // Reset
  document.getElementById('reset').onclick = function () {
    correct.parentNode.removeChild(correct);
    letters.parentNode.removeChild(letters);
    showClue.innerHTML = "";
    context.clearRect(0, 0, 400, 400);
    play();
  }

  // ? How To Play
  // Get the modal
  var modal = document.getElementById("myModal");

  // Get the button that opens the modal
  var btn = document.getElementById("howToPlay");

  // When the user clicks on the button, open the modal
  btn.onclick = function () {
    modal.style.display = "block";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  // When the user scrolls the page, execute myFunction
  window.onscroll = function () { stickyNavbarFunction() };

  // Get the navbar
  var navbar = document.getElementById("navbar");

  // Get the offset position of the navbar
  var sticky = navbar.offsetTop;

  // Add the sticky class to the navbar when you reach its scroll position
  function stickyNavbarFunction() {
    if (window.pageYOffset >= sticky) {
      navbar.classList.add("sticky")
    } else {
      navbar.classList.remove("sticky");
    }
  }
}

// Hide answer from being displayed in console
console.log = function () { }

