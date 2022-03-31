var ball;
var database, position, hypnoticBall;


function setup(){
    database = firebase.database(); //Se encarga de validar la base de datos se con el index
    //y así pode usarla
    console.log(database);
    createCanvas(500,500);
    
    hypnoticBall = createSprite(250,250,10,10);
    hypnoticBall.shapeColor = "red";

    var hypnoticBallPosition = database.ref('ball/position');
    /*.ref() se utiliza para hacer referencia a la ubicación del valor de
    la base de datos que nos interesa*/
    hypnoticBallPosition.on("value", readPosition, showError);
    /*.on() crea un oyente, que sigue escuchando los cambios en la base de datos
    de posicion(referencia) en la cual dentro de este va a llamar a la función readPsotion()*/
    
}

function draw(){
    background("white");
    if(position !== undefined){ 
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();

    }
}

function writePosition(x,y){
    database.ref('ball/position').set({ /*proporcionamos la ubicación usando el .ref() y luego
    usaremos .set() para actualizar */
    'x': position.x + x , //tenemos el nodo/hijo x en la cual se le asigna el dato que tenemos del data 
    'y': position.y + y // lo mismo para y
    
 })
}

function readPosition(data){
    position = data.val(); //valores que vamos a ocupar para la base de datos
    /*console.log(position.x); //opcional la consola*/
    /*leeremos y asignaremos los valores x e y de la posicion
    de la pelota(hypnoticBall), en la base de datos, pero aun 
    no se guarda los cambios en la base de datos*/
    hypnoticBall.x = position.x;
    hypnoticBall.y = position.y;
  }

function showError(){
    console.log("Error al escribir en la base de datos");
}
