window.onload = function () {

  var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
    'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
    't', 'u', 'v', 'w', 'x', 'y', 'z'];

  var categories;         // Array of topics
  var chosenCategory;     // Selected category
  var getHint;          // Word getHint
  var word;              // Selected word
  var guess;             // Geuss
  var guesses = [];      // Stored guesses
  var lives;             // Lives
  var counter;           // Count correct guesses
  var space;              // Number of spaces in word '-'

  // Get elements
  var showLives = document.getElementById("mylives");
  var showCatagory = document.getElementById("scategory");
  var getHint = document.getElementById("hint");
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
      categoryName.innerHTML = "Category: Flowers";
    } else if (chosenCategory === categories[1]) {
      categoryName.innerHTML = "Category: Sports";
    } else if (chosenCategory === categories[2]) {
      categoryName.innerHTML = "Category: Colours";
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
    // showLives.innerHTML = "You have " + lives + " lives";
    if (lives < 1) {
      showLives.innerHTML = "Game Over";
    }
    for (var i = 0; i < guesses.length; i++) {
      if (counter + space === guesses.length) {
        showLives.innerHTML = "You Win!";
      }
    }

    if (correctWord === true) {
      numRounds += 1;
        // each time win, change to next round
        if (numRounds == 5) {
          showRound.innerHTML = "Congratulations! You've guess all the words correctly " + numRounds;
          numRounds = 0;
          window.location.replace("win.html");
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
      var geuss = (this.innerHTML);
      this.setAttribute("class", "active");
      this.onclick = null;
      for (var i = 0; i < word.length; i++) {
        if (word[i] === geuss) {
          guesses[i].innerHTML = geuss;
          counter += 1;
        }
      }
      var j = (word.indexOf(geuss));
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
    result();
    comments();
    selectCat();
    canvas();
  }

  play();

  // Hint
  hint.onclick = function () {

    hints = [
      ["has seeds that can be eaten", "fifty of them signifies unconditional love", "symbolises purity and innocence", "a character's name in Micky Mouse Clubhouse", "name of an MRT station in Singapore"],
      ["Haikyu!!", "Kuroko no Basuke", "Birdie Wing", "Free!", "Rafael Nadal"],
      ["a colour in a rainbow", "water + sea", "part of a bands name", "condiment", "a city name in Pokemon"]
    ];

    var categoryIndex = categories.indexOf(chosenCategory);
    var hintIndex = chosenCategory.indexOf(word);
    showClue.innerHTML = "Clue: " + hints[categoryIndex][hintIndex];
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
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  // firework = function(){
  //   window.addEventListener("resize", resizeCanvas, false);
  //       window.addEventListener("DOMContentLoaded", onLoad, false);
        
  //       window.requestAnimationFrame = 
  //           window.requestAnimationFrame       || 
  //           window.webkitRequestAnimationFrame || 
  //           window.mozRequestAnimationFrame    || 
  //           window.oRequestAnimationFrame      || 
  //           window.msRequestAnimationFrame     || 
  //           function (callback) {
  //               window.setTimeout(callback, 1000/60);
  //           };
        
  //       var canvas, ctx, w, h, particles = [], probability = 0.04,
  //           xPoint, yPoint;
        
  //       function onLoad() {
  //           canvas = document.getElementById("canvas");
  //           ctx = canvas.getContext("2d");
  //           resizeCanvas();
            
  //           window.requestAnimationFrame(updateWorld);
  //       } 
        
  //       function resizeCanvas() {
  //           if (!!canvas) {
  //               w = canvas.width = window.innerWidth;
  //               h = canvas.height = window.innerHeight;
  //           }
  //       } 
        
  //       function updateWorld() {
  //           update();
  //           paint();
  //           window.requestAnimationFrame(updateWorld);
  //       } 
        
  //       function update() {
  //           if (particles.length < 500 && Math.random() < probability) {
  //               createFirework();
  //           }
  //           var alive = [];
  //           for (var i=0; i<particles.length; i++) {
  //               if (particles[i].move()) {
  //                   alive.push(particles[i]);
  //               }
  //           }
  //           particles = alive;
  //       } 
        
  //       function paint() {
  //           ctx.globalCompositeOperation = 'source-over';
  //           ctx.fillStyle = "rgba(0,0,0,0.2)";
  //           ctx.fillRect(0, 0, w, h);
  //           ctx.globalCompositeOperation = 'lighter';
  //           for (var i=0; i<particles.length; i++) {
  //               particles[i].draw(ctx);
  //           }
  //       } 
        
  //       function createFirework() {
  //           xPoint = Math.random()*(w-200)+100;
  //           yPoint = Math.random()*(h-200)+100;
  //           var nFire = Math.random()*50+100;
  //           var c = "rgb("+(~~(Math.random()*200+55))+","
  //                +(~~(Math.random()*200+55))+","+(~~(Math.random()*200+55))+")";
  //           for (var i=0; i<nFire; i++) {
  //               var particle = new Particle();
  //               particle.color = c;
  //               var vy = Math.sqrt(25-particle.vx*particle.vx);
  //               if (Math.abs(particle.vy) > vy) {
  //                   particle.vy = particle.vy>0 ? vy: -vy;
  //               }
  //               particles.push(particle);
  //           }
  //       } 
        
  //       function Particle() {
  //           this.w = this.h = Math.random()*4+1;
            
  //           this.x = xPoint-this.w/2;
  //           this.y = yPoint-this.h/2;
            
  //           this.vx = (Math.random()-0.5)*10;
  //           this.vy = (Math.random()-0.5)*10;
            
  //           this.alpha = Math.random()*.5+.5;
            
  //           this.color;
  //       } 
        
  //       Particle.prototype = {
  //           gravity: 0.05,
  //           move: function () {
  //               this.x += this.vx;
  //               this.vy += this.gravity;
  //               this.y += this.vy;
  //               this.alpha -= 0.01;
  //               if (this.x <= -this.w || this.x >= screen.width ||
  //                   this.y >= screen.height ||
  //                   this.alpha <= 0) {
  //                       return false;
  //               }
  //               return true;
  //           },
  //           draw: function (c) {
  //               c.save();
  //               c.beginPath();
                
  //               c.translate(this.x+this.w/2, this.y+this.h/2);
  //               c.arc(0, 0, this.w, 0, Math.PI*2);
  //               c.fillStyle = this.color;
  //               c.globalAlpha = this.alpha;
                
  //               c.closePath();
  //               c.fill();
  //               c.restore();
  //           }
  //       } 
  // }
}

// Hide answer from being displayed in console
console.log = function () { }


