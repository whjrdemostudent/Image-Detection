img = "";
status = "";
objects = [];

function preload() {
    img = loadImage("https://static.scientificamerican.com/sciam/cache/file/1DDFE633-2B85-468D-B28D05ADAE7D1AD8_source.jpg?w=590&h=800&D80F3D79-4382-49FA-BE4B4D0C62A5C3ED")
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