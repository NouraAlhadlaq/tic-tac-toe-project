$(function () {


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


    startGame();

    $start.on("click", function () {
        startGame();
    }) //Starts the game after clicking start button


    function startGame() {
        $turn = "x";
        $winner = null;
        $count = 0;
        for (var i = 0; i <= $box.length; i++) {
            $("#box" + i).text("");
        }
        message($turn + " starts the game");
    }

    function message(msg) {
        $("#status").text(msg);
    }

    $box.on("click", function () {
        
        nextMove($(this));
   
    })

    function nextMove(box) {
        if ($winner != null || $count == 9) {
            message(" Replay !");

        }
        else if (box.text() == '') {
            box.text($turn);
            switchTurn();
        }
        else {
            message("pick another place!");
        }
    }

    function draw() {
        if ($count == 9) {
            message("draw!");
        }
    }
    
    function switchTurn() {
        if (winner($turn)) {
            message("congrats, " + $turn + " won!");
            $winner = $turn;
            if ($turn == "x") {
                xScore++;
            } else {
                oScore++;
            }
            $score.text("Score X:" + xScore + "    O:" + oScore);
        }
        else if ($turn == "x") {
            $turn = "o";
            message($turn + "'s turn");
            $count++;
            draw();
        } else if ($turn == "o") {
            $turn = "x";
            message($turn + "'s turn");
            $count++;
        }
        // message("congrats ");
    }
    function winner(move) {
        var result = false;
        if (checkLine(1, 2, 3, move) ||
            checkLine(4, 5, 6, move) ||
            checkLine(7, 8, 9, move) ||
            checkLine(1, 4, 7, move) ||
            checkLine(2, 5, 8, move) ||
            checkLine(3, 6, 9, move) ||
            checkLine(1, 5, 9, move) ||
            checkLine(3, 5, 7, move)) {
            result = true;
        }
        return result;
    }
    function checkLine(a, b, c, move) {
        var result = false;
        if (getBox(a) == move && getBox(b) == move && getBox(c) == move) {
            result = true;
        }
        return result;
    }

    function getBox(number) {
        return $("#box" + number).text();
        //console.log($("#box"+number));
    }

    $replay.on("click", function () {
        startGame();
        //$(this).prepend('<img id="theImg" src="images/o.png" />');
    })



})