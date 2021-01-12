const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;

var engine, world;
var dogimg01,dogimg02,dog, happyDog, database, foodS, foodStock;

database=firebase.database();


function preload()
{
  dogimg01=loadImage("images/dogimg.png");
  dogimg02=loadImage("images/dogimg1.png");
}

function setup() {
  createCanvas(800, 700);

  database = firebase.database();

  background(46, 139, 87)
  dog=createSprite(250,300,150,150);
  dog.addImage(dogimg01);
  dog.scale=0.2;
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
}


function draw() { 

  drawSprites();

  
  /*if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    
    dog.addImage(dogimg02);
  }*/
  
  textSize(15);
  noStroke();
  fill("white");
  text(foodS,170,200);
  text("Press Up Arrow to Feed your Dog Milk",130,50);
  //add styles here

}



function readStock(data){
  foodS=data.val();

}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })


  function decreaseFood(){
    if(keyWentDown(UP_ARROW)){
    foodStock = database.ref("Food");
    foodS = foodS - 1;
    foodStock.set(foodS);
    dog.addImage(dogimg02);
   // food.x = 350;
   // food.y = 200;
   // food.scale = 0.1;

   decreaseFood();

  
    }
  }
    
  
}



















