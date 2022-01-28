var spaceImg, space;
var cloudImg, cloud, cloudsGroup;
var climberImg, climber, climbersGroup;
var boy, boyImg;
var comet, cometImg, cometsGroup;
var invisibleBlockGroup, invisibleBlock;
var score=0;
var gameState = "play";


function preload(){
  spaceImg = loadImage("space.png");
  cloudImg = loadImage("cloud.png");
  climberImg = loadImage("climber.png");
  boyImg = loadImage("boi.png");
  cometImg = loadImage("comet.png")
  cloudsGroup = createGroup();
  climbersGroup = createGroup();
  invisibleBlockGroup = createGroup();
  cometsGroup = createGroup();
}

function setup() {
  createCanvas(600, 600);
  space = createSprite(300,300);
  space.addImage("space",spaceImg);
  space.velocityY = 1;
  boy = createSprite(300,550);
  boy.addImage(boyImg);
  boy.scale = 0.3;
  score = 0;

 //comet.addCollider("circle",0,0,50);
}



function draw() {
  background(200);


  if (gameState === "play"){
  score = score + Math.round(getFrameRate()/60);

  if(keyDown("SPACE")){
    boy.velocityY = -8;
  }
  boy.velocityY = boy.velocityY + 0.5;

  if(keyDown("LEFT")){
    boy.x = boy.x - 10
  }

  if(keyDown("RIGHT")){
    boy.x = boy.x + 10
  }

  if(space.y > 400){
      space.y = 300;
    }
  ``

  if(boy.isTouching(invisibleBlockGroup)|| boy.isTouching(cometsGroup)){
    gameState = "end";
  }

  if(boy.isTouching(climbersGroup)){
    boy.velocityY = 0;
  }

  if(boy.y > 600){
    gameState = "end";
  }

  spawnClouds();
  spawnComets();
  drawSprites();
  }

  if(gameState === "end"){
    boy.velocityY = 0;
    space.velocityY = 0;
    background(15);
    text("Game Over!",250,300);

  }
    textSize(20);
    fill("blue");
    text("Score: "+ score, 400,50);
  

}

function spawnClouds(){
  if(frameCount % 240 === 0){
    var cloud = createSprite(200,-50);
    cloud.addImage(cloudImg);
    cloud.velocityY = 1;
    cloudsGroup.add(cloud);
    cloud.lifetime = 700;
    cloud.scale = 0.3;

    var climber = createSprite(200,10);
    climber.addImage(climberImg)
    climber.velocityY = 1;
    climber.scale = 0.5;
    climbersGroup.add(climber);

    climber.setCollider("rectangle",0,0,200,100);
    climber.debug = true;

    cloud.x = Math.round(random(100,500));
    climber.x = cloud.x;
    climber.y = cloud.y;

    var invisibleBlock = createSprite(200,15,60,5);
    invisibleBlock.visible = false;
    invisibleBlock.velocityY = 1;
    invisibleBlockGroup.add(invisibleBlock);

    invisibleBlock.x = cloud.x;
    invisibleBlock.y = climber.y+15;
    invisibleBlock.debug = true;

    boy.depth = cloud.depth + 1;
    cloud.depth = climber.depth + 1;


  }
}

function spawnComets(){
  if (frameCount % 150 === 0){
    var comet = createSprite(200,-20);
    comet.addImage(cometImg);
    cometsGroup.add(comet);
    comet.velocityY = 3;
    comet.scale = 0.2;

    comet.x = Math.round(random(0,600));
    comet.debug = true;
    comet.setCollider("rectangle",0,0,100,300);
    comet.lifetime = 600;

    if(frameCount % 100 === 0){
      comet.velocityY = +(2 + score/100);

  
    }
  }
}
