let buttonColors = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let level = 0;

let started = false;


$(document).keypress(function(){
    if(!started){

        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;

    }
});


// function to get user clicks.
$(".btn").on("click", function(){

    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    // console.log(userClickedPattern);

    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);

});



function nextSequence(){
    userClickedPattern = [];
    
    let randInt = Math.floor((Math.random()*4));
    
    let randomChosenColor = buttonColors[randInt];
    gamePattern.push(randomChosenColor);
    
    
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    
    level++;    
    $("#level-title").text("Level " + level);

    
}
// nextSequence();


// function to play sound
function playSound(colorName){

    let audio = new Audio("sounds/" + colorName + ".mp3");
    audio.play();
}


function animatePress(pressed){
    $("." + pressed).addClass("pressed");
    setTimeout(function(){
        $("." + pressed).removeClass("pressed");
    }, 100);
}


function checkAnswer(currentLevel){

    if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
        console.log("success!");
        if(userClickedPattern.length === gamePattern.length){
            
            setTimeout(function(){
                nextSequence();
            }, 1000);
        
        }
    }else{
        
        playSound("wrong");

        $("#level-title").text("Game Over, Press Any Key to Restart");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        startOver();

        console.log("failure");
    }
};

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}