var canvas, camx;
var player, enemy, clouds;
var isJumping, score, speed;
var gameState = 0;



var car1, car2, car3, car4, cars;
function preload(){
  trex = loadAnimation("trex.gif");
  cactus1 = loadAnimation("cactus.gif");
  cactus2 = loadAnimation("cact2.gif");
  cloud = loadAnimation("cloud.gif");
  dead = loadAnimation("tded.gif");
  anime1 = loadAnimation("t1.png");
  anime2 = loadAnimation("t2.png");
  anime3 = loadAnimation("t3.png");
}
function setup(){
  camx = camera.position.x;
  ground = createSprite(camx,400,1200,20);
  canvas = createCanvas(1200,400);
  player = createSprite(camx -550,350,1,1);
  player.addAnimation(" ",anime1, anime2, anime3);
  enemy = createSprite(camx + 1250,350,1,25);
  enemy.addAnimation("d", cactus1);
  enemy.scale = 0.5;
  score = 0;
  speed = 2
}


function draw(){
  background(255,255,255)
  camx = camera.position.x;
  ground.x = camx;
  textSize(15); 
  text("Score: " + score, camx + 500,20);

  player.collide(ground);
  if(gameState == 0){
    if(score % 1000 == 0 && score != 0){
      speed += 0.5;
    }
    player.addAnimation(" ",anime1, anime2, anime3);
    player.scale = 1;
    score += 1;
    camera.position.x += speed;
    player.x = camx- 550;
    if(camx % 400 == 0){
      clouds = createSprite(camx + 650,random(20,200),1,1);
      clouds.addAnimation("cc",cloud)
      clouds.scale = random(0.5,1.5);
    }
    if(camx - 620 > enemy.x){
      rand = random(1,2);
      enemy.x = camx-600 + 1300;
      if(rand == 1){
        enemy.addAnimation("d", cactus1);
      }
      else{
        enemy.addAnimation("d", cactus2);
        enemy.scale = 1;
      }
    }
    if(keyDown("SPACE") && player.y > 342){
      player.velocityY = -6;
    }
    if(player.y < 340){
      isJumping = true;
    }
    else{
      isJumping = false;
    }
    if(player.velocityY != 0){
      player.velocityY += 0.1;
    }
    if(player.x + 40 >= enemy.x && !isJumping){
      gameState = 1;
      console.log("yeet");
    }
  }
  else{
    player.addAnimation(" ", dead);
    player.y = 343;
    
    textSize(30);
    fill("red");
    text("GAME OVER",camx-100,200);
    fill("black");
    textSize(20);
    text("Press Space to Restart", camx - 110,250);
    if(keyDown("SPACE")){
      speed = 2;
      score = 0;
      gameState = 0;
    }
  }
  
  drawSprites();
}
