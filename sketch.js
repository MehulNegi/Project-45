var player, robotImg;
var laser,laserImg,laserGroup;
var ground;
var backGround,backGroundImg;
var enemyImg,enemyGroup;

function preload(){
  robotImg = loadImage("Images/sprite.png");
  laserImg = loadImage("Images/laser.png");
  enemyImg = loadAnimation("Images/enemy1.png","Images/enemy2.png");
  backGroundImg = loadImage("Images/background.png");
}

function setup(){
  createCanvas(400,400);
  
  backGround = createSprite(200, 240);
  backGround.addImage(backGroundImg);
  backGround.scale = 3;
  backGround.x = backGround.width /2;
  backGround.velocityX = -5;
  
  player = createSprite(40,345);
  player.addImage("moving", robotImg);
  player.scale = 0.13;
  
  ground  = createSprite(200,350,400,10);
  ground.visible = false;
  
  laserGroup = new Group();
  enemyGroup = new Group();  
  
}

function draw(){
  background("Black");
  
  player.collide(ground);
  
  if (backGround.x < 0){
    backGround.x = backGround.width/2;
  } 
    
  player.velocityY = player.velocityY + 0.8;  
  
  if (keyDown("up_arrow") && player.y>170){
    player.velocityY = -10;
  }
    
  enemy();
    
  if (keyDown("space")) {
    createLaser();
  }
    
  if (laserGroup.isTouching(enemyGroup)) {
    enemyGroup.destroyEach();
    laserGroup.destroyEach();
  }

  drawSprites(); 
}

function createLaser () {
  var laser = createSprite(40,100,5,10);
  laser.velocityX = 10;
  laser.addImage(laserImg);
  laser.y = player.y;
  laser.scale = 0.1;
  laser.lifetime = 38;
  laserGroup.add(laser);
  return laser; 
}

function enemy() {
  if (frameCount % 80 === 0) {
   var enemy = createSprite(400,30,10,10);
    enemy.addAnimation("moving",enemyImg);
    enemy.scale = 0.7;
    enemy.velocityX = -6;
    enemy.y = Math.round(random(180,340));
    enemy.setLifetime = 5;
    enemyGroup.add(enemy);    
  }  
}