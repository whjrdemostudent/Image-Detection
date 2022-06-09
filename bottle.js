img = "";
status = "";
objects = [];
function preload() {
    img = loadImage("https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1646070784-screen-shot-2022-02-28-at-12-51-51-pm-1646070725.png")
}


function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector("cocossd", modelLoaded)
    document.getElementById("status").innerHTML = "Status : Detecting Objects"
}

function draw(){
    image(img, 0, 0, 640, 420);
    if(status != ""){
        for(i = 0; i < objects.length; i++){

        document.getElementById("status").innerHTML = "Status : Object Detected"

        fill("red")
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y + 15)
        noFill()
        stroke("blue")
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }

    }
}

function modelLoaded() {
    console.log("Model Loaded")
    status = true;
    objectDetector.detect(img, gotResult);

}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}