//                                                               Regular variables

var database;

var dog;

var food1, foodStock;

var happy, ok;

//                                                               Timer variables

var argument;

var time = 0;

  var TRUE = 0;
  var FALSE = 1;

/**
 *                                                                   Preload
 */

function preload(){
  happy = loadImage("images/dogImg1.png")
  ok = loadImage("images/dogImg.png")
}

/**
 *                                                                    Setup
 */

function setup() {
  createCanvas(800, 700);
  database = firebase.database();

  dog = createSprite(400, 350);
  dog.addImage(ok);
  dog.scale = 0.3;

  foodStock = database.ref("food");
  foodStock.on("value", readStock, yaGoofedUp);
}

/**
 *                                                                     DRAW
 */

function draw() {

  background(19, 105, 19);

  findMousePos();

  texts();

  drawSprites();
  
  if(keyWentUp(UP_ARROW)){
    writeStock(food1);
    ok = null;
    dog.addImage(happy);
    //wait(2);
  }
}


/**
 *                                                                  MY FUNCTIONS
 */


function yaGoofedUp(){// My show error function
  var argument = 1;
  if(argument === 1){
    print("Somthin aint right....");
    argument = 0;
  }
}

function writeStock(f){
  if(f<=0){
    f = 0;
  }else{
    f = f - 1;
  }

  database.ref("/").update({
    food: f
  })
}

function readStock(data){
  food1 = data.val();
}

function findMousePos(){
	var argument;
	argument = 1;
	if(keyWentDown(32) && argument === 1){
		print("{"+"x: "+ mouseX + ", y: "+ mouseY+"}");
		argument = 0;
		argument = 1;
	}
}

function beNormal(){
  dog.addImage(ok);
}

function wait(delay){
  var time = new Date();
  var seconds = time.getSeconds();

  if(seconds >= delay){
    beNormal();
  }
}

function texts(){

  textSize(30);
  stroke("black");
  strokeWeight(3);
  fill("white");

  if(food1 === undefined){
    text1 = null;
    text2 = null;
  }else{
    text1 = text("Food: "+food1, 302, 41);
    text2 = text("Press the Up arrow key to feed the dog!", 160, 75);
  }
}