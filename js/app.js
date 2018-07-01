console.log("Hello fellow coder!");
// Enemies our player must avoid
class Enemy {
// enemy constructor function
    constructor(x,y){
      // List for all enemies sources
    var spriteList = ["images/char-boy.png", "images/char-cat-girl.png", "images/char-horn-girl.png", "images/char-pink-girl.png", "images/char-princess-girl.png"]
    // Shuffle function from http://stackoverflow.com/a/2450976
    function shuffle(array){
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }
    // Shuffles spriteList and assigns random character to this.sprite
    // All enemy object information. x,y,height & width needed for collisions.
    var sprites = shuffle(spriteList);
    let i;
    for(i = 0; i < spriteList.length; i++){
    this.sprite = sprites[i];
    this.x = x;
    this.y = y;
    this.speed =  Math.floor((Math.random() * 2) + 1);
    this.class = 'enemy';
    this.height = 60;
    this.width = 50;
  }
}

// Updates the enemy's position
// Parameter: dt, a time delta between ticks
update(dt) {
        // dt multiplier ensures game runs at same speed for all computers
    dt = 1;
    // If statements keep the enemies within road tiles
    if(this.x <= 419){
      this.x = (this.x  + dt * this.speed * (Math.floor(Math.random() * 3) +1));
    }
    if(this.x >= 420){
      this.x = -100;
    }
    // collision detection
    for(let i = 0; i < allEnemies.length; i++) {
				if ((player.x < allEnemies[i].x + allEnemies[i].width) &&
				(player.x + player.width > allEnemies[i].x) &&
				(player.y < allEnemies[i].y + allEnemies[i].height) &&
        (player.height + player.y > allEnemies[i].y)) {
          player.x = 200;
          player.y = 450;
          console.log("Ouch! 1 bug lost.");
          looselife();
        }
      }
// end of update()
}
// Draw the enemy on the screen, required method for game
  render(x,y) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}
// player object
class Player {
  // constructor function for player. x,y,height & width needed for collisions
  constructor(x,y) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.name;
    this.speedX = 0;
    this.speedY = 0;
    this.id = 'player';
    this.height = 80;
    this.width = 80;
    this.lives = 5;
    this.points = 0;
    this.gemScore = 0;
    this.water = 0;
    this.blue = 0;
    this.green = 0;
    this.orange = 0;
}
  update(x,y){

  }
// paint the player on the canvas
  render(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    // draws text at top of canvas
    ctx.font = "22px 'Montserrat', sans-serif";
    ctx.fillText("Bugs Saved: " + this.water, 10, 20);
    ctx.fillText(this.lives + " Lives Remaining", 305, 20);
    ctx.fillText("Gems: " + this.gemScore, 10, 45);
    ctx.fillText("Points: " + this.points, 370, 45);
// Game over screen
    if(this.lives === 0){
      ctx.fillStyle="#FFFFFF";
      ctx.fillRect(0,0,600,600);
      ctx.fillStyle="#000000";
      ctx.font = "40px 'Montserrat', sans-serif";
      ctx.fillText("Game Over!!", 140, 270);
      ctx.font = "22px 'Montserrat', sans-serif";
      ctx.fillText("Finding more bugs...", 150, 300);
      restartFail();
    }
  }
// winning screen
  //   if(this.water === 1){
  //     }
  // }
  // runs code for each direction key input with boundaries in game area
  handleInput(keyCode){
    if(keyCode == 'left' && (this.x > 1)){
      this.x -= 100;
    }
    if(keyCode == 'right' && (this.x < 310)){
      this.x += 100;
    }
    if(keyCode == 'up' && (this.y > 100)){
      this.y -= 75;
    }
    if(keyCode == 'down' && (this.y < 420)){
      this.y += 75;
    }
    // function to add score for reaching water
    if(this.y <= 100){
      this.water ++;
      this.points += 200;
      console.log("You saved a bug! Total bugs saved = " + this.water);
    // if water reached 10 times - load winning screen
      if(this.water === 10){
        winanimation();
        // resets player position to avoid further collisions
        this.x = 200;
        this.y = 450;
    }
    // resets player to starting position once water is reached
    else {
      this.x = 200;
      this.y = 450;
    }
  }
}
}
// Enemy array
var allEnemies = [new Enemy(10,100), new Enemy(10,180), new Enemy(10,260)];
// player array
var player = new Player(200,450);

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// outside game animations
// loose life once collision occurs
function looselife(){
  player.lives --;
  if(player.lives === 0){
    console.log("You lost! :(");
    player.lives === 0;
  }
// loosing scenario
  if(player.points > 0){
  var total = player.points - 100;
  player.points = total;
  if(player.points < 0){
    player.points === 0;
    // resets player position to avoid further collisions
    player.x = 200;
    player.y = 450;
  }
  }
}
// Collected gems counter
function collectGem (){
  player.gemScore ++;
// Sets interval for a new gem appearance (only 1 gem in gem array at a time)
  var timer = setInterval(function newGem(){
    var i;
    if(gemList.length === 0){
    // Shuffle function from http://stackoverflow.com/a/2450976
    function shuffle(array){
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
      }
    // Shuffles spriteList and assigns random character to this.sprite
    var randomGem = shuffle(xArray);
    var randomGemY = shuffle(yArray);
    let i;
      for(i = 0; i < xArray.length; i++){
      var randomX = xArray[i];
      }
      for(i = 0; i < yArray.length; i++){
        var randomY = yArray[i];
      }
      gemList.push(new Gem(randomX, randomY));
    }
},5000);
// end of collect gem
}
// x position arrays for gems (ensures gems appear in center of tiles)
var xArray = [15, 120, 220, 320, 420];
// y position arrays for gems
var yArray = [132, 215, 302];

// Winning animation
function winanimation(){
  var winmodal = document.getElementById('winCon');
  winmodal.style.display = "block";
    console.log("You won!! :)");
    // prints winning scores, and if value is 0, replace with 0
  var pointPrint = document.getElementById('points');
  if(player.points === 0){
    pointPrint.innerHTML = 0;
  }
  if(player.points > 0){
    pointPrint.innerHTML = player.points;
  }
  var bugPrint = document.getElementById('bugs');
  if(player.water === 0){
    bugPrint.innerHTML = 0;
  }
  if(player.water > 0){
    bugPrint.innerHTML = player.water;
  }
  var livesPrint = document.getElementById('lives');
  if(player.lives === 0){
    livesPrint.innerHTML = 0;
  }
  if(player.lives > 0){
    livesPrint.innerHTML = player.lives;
  }
  var bluePrint = document.getElementById('blue-gem');
  if(player.blue === 0){
    bluePrint.innerHTML = 0;
  }
  if(player.blue > 0){
    bluePrint.innerHTML = player.blue;
  }
  var orangePrint = document.getElementById('orange-gem');
  if(player.orange === 0){
    orangePrint.innerHTML = 0;
  }
  if(player.orange > 0){
    orangePrint.innerHTML = player.orange;
  }
  var greenPrint = document.getElementById('green-gem');
  if(player.green === 0){
    greenPrint.innerHTML = 0;
  }
  if(player.green > 0){
    greenPrint.innerHTML = player.green;
  }
// add event listener to call restart on play-again
  var refresh = document.getElementById('again');
  refresh.addEventListener("click", restart);
  // end of winning animation
}
// Reloads whole web page after 1 second called my "play-again" element on winning modal
function restart(){
    setTimeout(function(){
    document.location.reload();
  },1000);
}
// Reloads whole web page after 2 seconds once game over scenario reached
function restartFail(){
    setTimeout(function(){
    document.location.reload();
  },2000);
}
// Gem objects
class Gem {
  // gem object constructor function
  constructor(x,y) {
    var gemSprites = ["images/gem-blue.png", "images/gem-green.png", "images/gem-orange.png"];
    // Shuffle function from http://stackoverflow.com/a/2450976
    function shuffle(array){
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }
    // Shuffles spriteList and assigns random character to this.sprite
    var sprites = shuffle(gemSprites);
    let i;
    for(i = 0; i < gemSprites.length; i++){
    this.sprite = gemSprites[i];
    this.x = x;
    this.y = y;
    this.height = 50;
    this.width = 50;
    this.class = "gem";
    this.points = 0;

  }
  }
// paints gems to canvas
  render() {
          ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
// updates interaction with gems
  update(dt){
    var i;
    // collision detection
      if ((player.x < this.x + this.width) &&
      (player.x + player.width > this.x) &&
      (player.y < this.y + this.height) &&
      (player.height + player.y > this.y)) {
      // call to change gem count
      collectGem();
      var i;
      // assigns different score dependant on gem colour
      if(this.sprite === "images/gem-blue.png"){
      this.points += 50;
      player.blue ++;
      var total = player.points + this.points;
      player.points = total;
      if(player.points < 0){
      player.points === 0;
      }
    }
      if(this.sprite === "images/gem-orange.png"){
      this.points += 100;
      player.orange ++;
      var total = player.points + this.points;
      player.points = total;
      if(player.points < 0){
        player.points === 0;
      }
    }
      if(this.sprite === "images/gem-green.png"){
      this.points += 150;
      player.green ++;
      var total = player.points + this.points;
      player.points = total;
      if(player.points < 0){
        player.points === 0;
      }
    }
    // ensures only one gem is visible at a time
    gemList.pop();
  }
}
// end of gem object
}
// gem array
var gemList = [new Gem(15, 132)];

// intro modal loads on DOM ready
(function displayModal(){
  // displays modal with intro text
  var modal = document.getElementById('modalIntro');
  modal.style.display = "block";
  var intro = document.getElementById('intro');
  intro.style.display = "block";
  // addEventListener to next button to display instructions
  var next = document.getElementById('nextButton');
  next.addEventListener("click", swap);
  var inst = document.getElementById('instr');
  // swaps out text in intro modal
    function swap(){
      intro.style.display = "none";
      inst.style.display = "block";
    }
      // sets delay to add event listeners to remove modal and
      // begin game (used delay as click on next button was reacting to event listener)
        var setEvnt = setTimeout( function(){
          window.addEventListener("click", hideModal);
        window.addEventListener("keyup", hideModal);
      },3000);
// Hides modal
  function hideModal(){
    modal.style.display = "none";
  }
// end of modal function
})();
