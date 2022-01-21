let started = false;  //false -> game not yet started.
let myTurn = false;   //false -> its not yet my turn.

let playerCard = [];
let computerCard = [];
let takenCard = []; 
    
let previousPlayerCardNum = 2;
let playerCardNum = 2;
let previousComputerCardNum = 2;
let computerCardNum = 2; 

$('.replay-btn').hide();
$('.hit-btn').hide();
$('.stand-btn').hide();
$('#scoreboard').hide();

$('.play-btn').on('click', gameStart);
    
$('.hit-btn').on('click', function(){
    if (myTurn) { //myTurn(true) -> button "hit" only works after 4 cards have been given
        playerCard.push(mathRandom());
        for (let i=0 ; i<takenCard.length ; i++) { 
            while(playerCard[playerCardNum] === takenCard.at(i)) {
                playerCard[playerCardNum] = mathRandom();
            }     
        }
        takenCard.push(playerCard[playerCardNum]);

        playerCardNum++;
        $('#player').append("<div class=\"player-card-"+playerCardNum+"\"><img class=\"card-image-"+playerCardNum+" visible\" src=\"images/"+playerCard[previousPlayerCardNum]+".png\"></div>");
        previousPlayerCardNum++;
        console.log(playerCard);
    } 
});

$('.stand-btn').on('click', function() {
    if (myTurn) {
        myTurn = false; // Now "Hit" button no longer works because its no longer my turn.

        let max = 21;

        $('.computer-card-1').html("<img class=\"card-image-1 visible\" src=\"images/"+computerCard[0]+".png\" alt=\"back of card\">");
        $('.computer-card-2').html("<img class=\"card-image-2 visible\" src=\"images/"+computerCard[1]+".png\" alt=\"back of card\">");

        while (calculateCard(computerCard) <= 15) {
            computerCard.push(mathRandom());
                for (let i=0 ; i<takenCard.length ; i++) {
                    while (computerCard[computerCardNum] === takenCard.at(i)) {
                        computerCard[computerCardNum] = mathRandom();
                    }
                }
            
            setTimeout(function(){
                computerCardNum++;
                $('#computer').append("<div class=\"computer-card-"+computerCardNum+"\"><img class=\"card-image-"+computerCardNum+" visible\" src=\"images/"+computerCard[previousComputerCardNum]+".png\"></div>");
                previousComputerCardNum++;
            }, 1000)
        }

        //pp = player points, cp = computer points
        let pp = calculateCard(playerCard); //calculate player cards for comparison below.
        let cp = calculateCard(computerCard); //calculate computer cards for comparison below.
    
        setTimeout(function(){
            if ( (pp<=max && cp>max) || (pp<=max && cp<=max && pp>cp) ) {
                $('#scoreboard').html(`<h1 class="score">${cp}<br><br>Player Wins!<br><br>${pp}</h1>`);
            } else if ( (cp<=max && pp>max) || (pp<=max && cp<=max && cp>pp) ) {
                $('#scoreboard').html(`<h1 class="score">${cp}<br><br>Computer Wins!<br><br>${pp}</h1>`);
            } else if ( (pp === cp && pp<max && cp<max) || (cp>max && pp>max) ) {
                $('#scoreboard').html(`<h1 class="score">${cp}<br><br>Draw.<br><br>${pp}</h1>`);
            }
            $('.replay-btn').show();
            $('#scoreboard').show();
            $('.game').hide();
        }, 3000)
    }
});

$('.replay-btn').on('click', function(){   
    $('#computer').html('');
    $('#player').html('');

    $('#computer').append('<div class=\'computer-card-1\' style=\'padding-left: 100px;\'></div><div class=\'computer-card-2\'></div>');
    $('#player').append('<div class=\'player-card-1\' style=\'padding-left: 100px;\'></div><div class=\'player-card-2\'></div>');

    resetGame();
    $('#scoreboard').hide();
    $('.replay-btn').hide();
    $('.game').show();

    gameStart();  
});

function resetGame () {
    started = false;
    myTurn = false;  //false -> its not yet my turn.

    playerCard = [];
    computerCard = [];
    takenCard = [];
    
    previousPlayerCardNum = 2;
    playerCardNum = 2;
    previousComputerCardNum = 2;
    computerCardNum = 2;
}

// generate random number from 1~52       
function mathRandom () {
    return Math.floor(Math.random() * 52) + 1;
}

// A function that calculates either player's or computer's points.
function calculateCard (arr) {
    let newArr = [];   
    let points = 0;

    for (let i=0 ; i<arr.length ; i++) {
        //make Ace card to 11 FIRST.
        if (arr[i] <= 4) {
            newArr.push(11);
        }

        //make 10, J, Q, K equal to 10
        if (arr[i] >= 37 && arr[i] <= 52) { 
            newArr.push(10);
        } 

        //assign card number 2 to 9
        if (arr[i] >= 5 && arr[i] <= 36) {
            if (arr[i]/4 <= 2) { // 5, 6, 7, 8
                newArr.push(2);
            } else if (arr[i]/4 <= 3) { // 9, 10, 11, 12
                newArr.push(3);
            } else if (arr[i]/4 <= 4) { // 13, 14, 15, 16
                newArr.push(4);
            } else if (arr[i]/4 <= 5) { // 17, 18, 19, 20
                newArr.push(5);
            } else if (arr[i]/4 <= 6) { // 21, 22, 23, 24
                newArr.push(6);
            } else if (arr[i]/4 <= 7) { // 25, 26, 27, 28
                newArr.push(7);
            } else if (arr[i]/4 <= 8) { // 29, 30, 31, 32
                newArr.push(8);
            } else if (arr[i]/4 <= 9) { // 33, 34, 35, 36
                newArr.push(9);
            }
        } 
        points += newArr[i];
    }

    // Change Ace to 1 due to exceeding 21.
    if (points > 21) {
        points = 0; // reset points to 0.
    
        for (let i=0 ; i<newArr.length ; i++) {
            if (newArr[i] === 11) {
                newArr[i] = 1;
            }
            points += newArr[i];
        }
    }
    
    return points;
}

function gameStart () {
    if (!started) {

        started = true; //game started -> so 'play' button no longer works onwards.
        $('.play-btn').hide();
        $('.hit-btn').show();
        $('.stand-btn').show();
        
        //assign card number to both computer's and player's FIRST (so might have duplicate number);
        playerCard.push(mathRandom());
        computerCard.push(mathRandom()); 

        computerCard.push(mathRandom()); 
        playerCard.push(mathRandom()); 
    
        //1st player card (do not have to compare with other card since its the first card)
        setTimeout(function(){     
            takenCard.push(playerCard[0]);
            $('.player-card-1').html("<img class=\"card-image-1\" src=\"images/"+playerCard[0]+".png\">")
            $('.card-image-1').addClass('visible');
        }, 0)

        //1st computer card (compare with 1st player card)
        setTimeout(function(){
            while (computerCard[0] === playerCard[0]) {
                computerCard[0] = mathRandom();
            }
            takenCard.push(computerCard[0]);
            $('.computer-card-1').html("<img src=\"images/back_of_card.jfif\" alt=\"back of card\">");
            $('.computer-card-1').addClass('visible');
        }, 1000)

        //2nd player card (compare with previous 2 cards)
        setTimeout(function(){
            while (playerCard[1] === computerCard[0] || playerCard[1] === playerCard[0]) {
                playerCard[1] = mathRandom(); 
            }
            takenCard.push(playerCard[1]);
            $('.player-card-2').html("<img class=\"card-image-2\" src=\"images/"+playerCard[1]+".png\">");
            $('.card-image-2').addClass('visible');
        }, 2000)

        //2nd computer card (compare with previous 3 cards)
        setTimeout(function(){
            while (computerCard[1] === computerCard[0] || computerCard[1] === playerCard[0] || computerCard[1] === playerCard[1]) {
                computerCard[1] = mathRandom();
            }
            takenCard.push(computerCard[1]);
            $('.computer-card-2').html("<img src=\"images/back_of_card.jfif\" alt=\"back of card\">");
            $('.computer-card-2').addClass('visible');

            myTurn = true; //start my turn which activates button 'Hit'
        }, 3000)
    }
}



