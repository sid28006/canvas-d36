var canvas,drawing,db_drawing,button,database;


function setup(){
    canvas = createCanvas(displayHeight,displayWidth);
    database = firebase.database();
    var button = createButton("clear");
    button.mousePressed(clear);
    drawing = [];
    db_drawing = [];
    point = {
        x: mouseX,
        y: mouseY
    }
    drawing.push(point);
    database.ref('drawing').set({
        "d": drawing
    })
}
function draw(){
    readData();
    stroke(255);
    strokeWeight(4);
    for(var i = 0;i < db_drawing.length; i++ ){
        point(db_drawing[i].x,db_drawing[i].y);
    }

}
function readData(){
    database.ref('drawing/').on('value',(data)=>{
        db_drawing = data.val();
    })
}
function clear(){
    db_drawing = [];
    database.ref('drawing').set({
        "d": []
    })
}