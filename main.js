img="";
status1="";
object = [];

function preload(){
    img=loadImage("dog_cat.jpg");
}

function setup(){
    canvas=createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting objects";
}

function draw(){
    image(img, 0, 0, 640, 420);
    if(status1 != ""){
        document.getElementById("status").innerHTML="Status : Detected objects";
        for(i=0; i<object.length;i++){
            fill("#FF0000");
            percentage = floor(object[i].confidence * 100);
            text(object[i].label + " " + percentage + "%" , object[i].x+15 , object[i].y+15);
            noFill();
            stroke("#FF0000");
            rect(object[i].x, object[i].y, object[i].width, object[i].height); 

        }
    }
    
}

function modelLoaded(){
    console.log("Model Loaded");
    status1 = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        object=results;
    }
}