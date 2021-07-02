//Create variables here
var database;
var dog;
var happyDog;
var foodS;
var foodStock;

function preload()
{
	//load images here
  dogImg1=loadImage("images/dogImg.png")
  dogImg2=loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(500, 500);
  database=firebase.database()
  dog=createSprite(250,300,150,150)
  dog.addImage(dogImg1)  
  dog.scale=0.15
  foodStock=database.ref("Food")
  foodStock.on("value",readStock)
}


function draw() {  
  background(46,139,87)
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS)
    dog.addImage(dogImg2)
  }
  drawSprites();
  //add styles here
  fill("white")
  stroke("black")
  textSize(20)
  text("Food Remaining: "+foodS,170,120)
  textSize(13)
  text("Note: Press Up Arrow Key to feed Spanky milk!!",130,10,300,20)
}

function readStock(data) {
  foodS=data.val()
}

function writeStock(x) {
  if(x<=0) {
    x=0
  }
  else {
    x=x-1
  }
  database.ref("/").update({
    Food:x
  })
}
