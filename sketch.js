



//var

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FruitsGroup, obstacleGroup;
var score, survialTime;
var ground;


//GameStates

var PLAY = 1;
var END = 0;
var gameState = PLAY;

//Preload function

function preload(){
  
  
  //monkey
  
  monkey_running=loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png") ;    
   
  //Banana
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}


//Setup

function setup() {
  
  createCanvas(400,400);
  
  //Groups
  
  FruitsGroup = createGroup();
  obstacleGroup = createGroup();
  TimeGroup = createGroup();
  
  //Monkey
  
  monkey = createSprite(50, 250, 10, 10);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.1;
  
 //Ground
  
  ground = createSprite(70, 350, 800, 10);
  ground.velocityX = -4;
  ground.x=ground.width/2;
  
  //score
  
  score = 0;
  survialTime = 0;
  
}


function draw() {
  
  //Background
  background ("green");
  
   //displaying survialtime
  
  stroke("brown");
    fill("brown");
      textSize(15);
  
  text("Survial Time:"+  survialTime, 10, 100);
  
  //displaying score
  
  stroke("brown");
    fill("brown");
      textSize(15);
  text("Score:"+  score, 280, 50);
  
 //Monkey
  
  monkey.collide(ground);
  
  //PLAY
  
  if(gameState === PLAY){
      monkey.changeAnimation("running", monkey_running);
    
    survialTime = Math.ceil(frameCount/frameRate());
     
    
    if (ground.x < 0){
      ground.x = ground.width/5;
    }
    
    //the monkey should jump when we press the space key
    
    if(keyDown("space")) {
        monkey.velocityY = -15;
    }    
    
    if(FruitsGroup.isTouching(monkey)) {
      FruitsGroup.destroyEach();
      score = score+5;
    }
   
  //set the gravity
    
  monkey.velocityY = monkey.velocityY + 0.5;
  
    
  
  
  //set the lifetime
    
  obstacleGroup.setLifetimeEach(-1);
  
  //Adding the Functions
    
  fruit();
  obstacles();
    
    
      
    
    
    if(obstacleGroup.isTouching(monkey)){
        
        gameState = END;
      
    }
  }
  
  //END
  
   if (gameState === END) {
     obstacleGroup.destroyEach();
    FruitsGroup.destroyEach();
     survialTime.visible = false;
     

     stroke("blue");
    fill("blue");
       textSize(15);
  text("Game Over", 150, 200);
     
      stroke("purple");
    fill("purple");
       textSize(15);
     text("Monkey is dead!", 100, 240);
   }
 
  
  
 

  
  drawSprites();
}

//fruits

function fruit() {
  if (frameCount % 50 === 0) {
    banana = createSprite(400,350,50,15);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(150,200));
    banana.scale = 0.2;
    
    banana.velocityX = -3;
    banana.lifetime = 200;
    
    FruitsGroup.add(banana);
  }
}

//Obstacles
function obstacles() {
  if (frameCount % 200 === 0){
    obstacle = createSprite(250,320,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -3;
    obstacle.lifetime = 200;
    obstacle.scale = 0.2;
     obstacleGroup.add(obstacle);
  }

}


 
 


