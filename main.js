$(function() {
  var $box = $(".box");
  var $turn = "x";
  var $start = $(".start");
  var $winner = null;
  var $replay = $(".replay");
  var $count = 0;
  var $score = $("#score");
  var xScore = 0;
  var oScore = 0;
  $score.text("Score X:" + xScore + "    O:" + oScore);

  startGame(); //calling startGame function

  //Starts the game after clicking start button
  $start.on("click", function() {
    startGame();
  });

  function startGame() {
    $turn = "x";
    $winner = null;
    $count = 0;
    $("button").removeClass("blinker");
    for (var i = 0; i <= $box.length; i++) {
      $("#box" + i).text("");
      $("#box" + i).css("color", "black");
    }
    message($turn + " starts the game");
  }

  //updates status message
  function message(msg) {
    $("#status").text(msg);
  }

  function draw() {
    if ($count == 9) {
      swal({ title: "Draw ! ", text: "Play Again!" });
      message("draw!");
    }
  }

  //when the box clicked call nextMove()
  $box.on("click", function() {
    nextMove($(this));
  });

  function nextMove(box) {
    if ($winner != null || $count == 9) {
      message(" Replay !");
      $(".replay").addClass("blinker");
    } else if (box.text() == "") {
      box.text($turn);
      switchTurn();
    } else {
      message("pick another place!");
    }
  }

  function switchTurn() {
    if (winner($turn)) {
      message("congrats, " + $turn + " won!");
      swal({
        title: "Congrats!  " + $turn,
        text: "You won!"
      });
      $winner = $turn;
      if ($turn == "x") {
        xScore++;
      } else {
        oScore++;
      }
      $score.text("Score X:" + xScore + "    O:" + oScore);
    } else if ($turn == "x") {
      $turn = "o";
      message($turn + "'s turn");
      $count++;
      draw();
    } else if ($turn == "o") {
      $turn = "x";
      message($turn + "'s turn");
      $count++;
    }
  }

  //takes
  function winner(play) {
    var result = false;
    if (
      checkWin(1, 2, 3, play) ||
      checkWin(4, 5, 6, play) ||
      checkWin(7, 8, 9, play) ||
      checkWin(1, 4, 7, play) ||
      checkWin(2, 5, 8, play) ||
      checkWin(3, 6, 9, play) ||
      checkWin(1, 5, 9, play) ||
      checkWin(3, 5, 7, play)
    ) {
      result = true;
    }
    return result;
  }

  function checkWin(a, b, c, play) {
    var result = false;
    if (getBox(a) == play && getBox(b) == play && getBox(c) == play) {
      result = true;

      $("#box" + a).css("color", "rgb(82, 110, 204)");
      $("#box" + b).css("color", "rgb(82, 110, 204)");
      $("#box" + c).css("color", "rgb(82, 110, 204)");
    }
    return result;
  }

  function getBox(number) {
    return $("#box" + number).text();
  }

  $replay.on("click", function() {
    startGame();
  });
});
