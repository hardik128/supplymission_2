var helicopterIMG, helicopterSprite, packageSprite,packageIMG;
var packageBody,ground,plank1,plank2,plank3,PLAY=1,END=0,gameState=PLAY;
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
	helicopterIMG=loadImage("helicopter.png")
	packageIMG=loadImage("package.png")
}

function setup() {
	createCanvas(800, 700);
	rectMode(CENTER);
	
	engine = Engine.create();
	world = engine.world;

	packageSprite=createSprite(width/2, 80, 10,10);
	packageSprite.addImage(packageIMG)
	packageSprite.scale=0.2

	helicopterSprite=createSprite(width/2, 200, 10,10);
	helicopterSprite.addImage(helicopterIMG)
	helicopterSprite.scale=0.6

	groundSprite=createSprite(width/2, height-35, width,10);
	groundSprite.shapeColor=color(255)
	
	plank1=new plank(width/2,height-45,200,20)
	plank2=new plank(width/2-90,height-155,20,200)
    plank3=new plank(width/2+90,height-155,20,200)

	engine = Engine.create();
	world = engine.world;

	packageBody = Bodies.circle(width/2 , 200 , 5 , {restitution:0.3, isStatic:true,friction:0.1});
	World.add(world, packageBody);
	
	//Create a Ground
	ground = Bodies.rectangle(width/2, 650, width, 10 , {isStatic:true} );
 	World.add(world, ground);


	Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
  background(0);
  packageSprite.x= packageBody.position.x  
  packageSprite.y= packageBody.position.y 
  
  /* if (keyDown("up")){
	helicopterSprite.y=helicopterSprite.y-5
	packageBody.y=packageBody.y-5
  }

  if (keyDown("down")){
   helicopterSprite.y=helicopterSprite.y+5
   packageBody.y=packageBody.y+5
 }*/

 if (keyDown("left") &&(gameState=PLAY)){
   helicopterSprite.x=helicopterSprite.x-7
   Matter.Body.translate(packageBody,{x:-7,y:0})

 }

 if (keyDown("right") &&(gameState=PLAY)){
   helicopterSprite.x=helicopterSprite.x+7
   Matter.Body.translate(packageBody,{x:+7,y:0})
 }

if (keyDown("down") &&(gameState=PLAY)){
	Matter.Body.setStatic(packageBody,false)
	gameState=END
}
console.log(gameState)
if (gameState=END){
	helicopterSprite.destroy();
	packageSprite.destroy();
	textSize(20)
	text("Thanks for Saving Us",200,300)
}
  
  drawSprites();
 
  plank1.display();
  plank2.display();
  plank3.display();
  

}

