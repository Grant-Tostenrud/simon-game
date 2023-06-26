// game

var gameSequence = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var startGameKeyboardPress = true;
var level = 0;
var step = 0;

// detect keyboard press which starts the game
$(document).keypress( function() {
  if (startGameKeyboardPress) {
    nextSequence();
    $("h1").text("Level 1");
    startGameKeyboardPress = false;
  }
})

// listen for button click, flash, check answer, and play sound
$( ".btn" ).on( "click", function() {
  // flash and play sound
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  animatePress(userChosenColor);

  // check answer
  if (checkAnswer()) {
    playSound(userChosenColor);
    if (step === gameSequence.length - 1) {
      // level passed, setup for next level
      userClickedPattern = [];
      setTimeout(function() {
        nextSequence();
      }, 1000);
    } else {
      // still working through this level's pattern
      step++;
    }
  } else {
    gameOver();
  }
} );

function nextSequence() {
  // generate next button in sequence
  var num = Math.floor(Math.random() * 4);
  var randomColor = buttonColors[num];
  gameSequence.push(randomColor);

  // alert to user with flash and sound
  var currentButton = $("#" + randomColor);
  currentButton.fadeOut(100);
  currentButton.fadeIn(100);
  playSound(randomColor);

  // reset step to zero
  step = 0;

  // update level
  level++;
  $("h1").text("Level " + level);
}

function checkAnswer() {
  // check that button user clicked matches the game sequence next button
  if (userClickedPattern[step] === gameSequence[step]) {
    return true;
  } else {
    return false;
  }
}

function gameOver() {
  // play wrong sound, flash red game over screen and display game over
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
  $("h1").text("Game Over, Press Any Key to Restart");

  // reset variables
  gameSequence = [];
  userClickedPattern = [];
  startGameKeyboardPress = true;
  level = 0;
  step = 0;
}

function playSound(name) {
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
