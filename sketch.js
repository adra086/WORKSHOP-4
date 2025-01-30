let shapeType = "circle"; 
let sliderSize, inputText, brushTransparency;
let currentText = "";
let drawOutline = false; 
let selectedColor = [0, 0, 0]; 


let checkboxRed, checkboxGreen, checkboxBlue, checkboxRandom;
let fontArial, fontCourier, fontGeorgia;
let sizeSmall, sizeMedium, sizeLarge;

function setup() {
  createCanvas(600, 600);
  background(240);


  createP('Brush Size:').position(10, 10);
  sliderSize = createSlider(10, 100, 20);
  sliderSize.position(100, 20);

  createP('Enter Text to Draw:').position(10, 50);
  inputText = createInput();
  inputText.position(150, 60);

  createP('Select Brush Color:').position(10, 90);
  checkboxRed = createCheckbox('Red', false).position(150, 100).changed(deselectOtherColors);
  checkboxGreen = createCheckbox('Green', false).position(220, 100).changed(deselectOtherColors);
  checkboxBlue = createCheckbox('Blue', false).position(290, 100).changed(deselectOtherColors);
  checkboxRandom = createCheckbox('Random', false).position(360, 100).changed(deselectOtherColors);

  createP('Select Font:').position(10, 140);
  fontArial = createCheckbox('Arial', true).position(150, 150).changed(deselectOtherFonts); // Default font
  fontCourier = createCheckbox('Courier New', false).position(220, 150).changed(deselectOtherFonts);
  fontGeorgia = createCheckbox('Georgia', false).position(340, 150).changed(deselectOtherFonts);

  createP('Select Text Size:').position(10, 180);
  sizeSmall = createCheckbox('Small (15px)', false).position(150, 190).changed(deselectOtherSizes);
  sizeMedium = createCheckbox('Medium (30px)', true).position(260, 190).changed(deselectOtherSizes); // Default size
  sizeLarge = createCheckbox('Large (50px)', false).position(400, 190).changed(deselectOtherSizes);

  brushTransparency = 150; 

  createP('Keyboard Interactions:').position(10, 220);
  createP('Press "C" for Circle, "R" for Rectangle, "T" for Triangle').position(10, 240);
  createP('Press "A" to increase transparency, "D" to decrease transparency, "O" to toggle outline, "B" to reset the canvas').position(10, 260);
}

function draw() {
  let size = sliderSize.value();
  setBrushColor(); 

  if (mouseIsPressed) {
    if (drawOutline) {
      stroke(0);
    } else {
      noStroke();
    }

    fill(selectedColor[0], selectedColor[1], selectedColor[2], brushTransparency);

    if (shapeType === "circle") {
      ellipse(mouseX, mouseY, size, size);
    } else if (shapeType === "rectangle") {
      rect(mouseX - size / 2, mouseY - size / 2, size, size);
    } else if (shapeType === "triangle") {
      triangle(
        mouseX, mouseY - size / 2,
        mouseX - size / 2, mouseY + size / 2,
        mouseX + size / 2, mouseY + size / 2
      );
    }
  }

  if (currentText !== "") {
    textSize(getTextSize());
    textFont(getSelectedFont());
    textAlign(CENTER, CENTER);

    fill(selectedColor[0], selectedColor[1], selectedColor[2], brushTransparency);
    text(currentText, mouseX, mouseY);
  }
}

function setBrushColor() {
  if (checkboxRandom.checked()) {
    selectedColor = [random(255), random(255), random(255)];
  } else if (checkboxRed.checked()) {
    selectedColor = [255, 0, 0]; // Red
  } else if (checkboxGreen.checked()) {
    selectedColor = [0, 255, 0]; // Green
  } else if (checkboxBlue.checked()) {
    selectedColor = [0, 0, 255]; // Blue
  } else {
    selectedColor = [0, 0, 0]; // Default black
  }
}

function getSelectedFont() {
  if (fontCourier.checked()) {
    return 'Courier New';
  } else if (fontGeorgia.checked()) {
    return 'Georgia';
  } else {
    return 'Arial'; // Default font
  }
}

function getTextSize() {
  if (sizeSmall.checked()) {
    return 15;
  } else if (sizeLarge.checked()) {
    return 50;
  } else {
    return 30; // Default size
  }
}

function deselectOtherColors() {
  if (this.checked()) {
    checkboxRed.checked(this === checkboxRed);
    checkboxGreen.checked(this === checkboxGreen);
    checkboxBlue.checked(this === checkboxBlue);
    checkboxRandom.checked(this === checkboxRandom);
  }
}

function deselectOtherFonts() {
  if (this.checked()) {
    fontArial.checked(this === fontArial);
    fontCourier.checked(this === fontCourier);
    fontGeorgia.checked(this === fontGeorgia);
  }
}

function deselectOtherSizes() {
  if (this.checked()) {
    sizeSmall.checked(this === sizeSmall);
    sizeMedium.checked(this === sizeMedium);
    sizeLarge.checked(this === sizeLarge);
  }
}

function keyPressed() {
  if (key === 'C' || key === 'c') {
    shapeType = "circle";
  } else if (key === 'R' || key === 'r') {
    shapeType = "rectangle";
  } else if (key === 'T' || key === 't') {
    shapeType = "triangle";
  } else if (key === 'A' || key === 'a') {
    brushTransparency = min(brushTransparency + 10, 255); // Increase transparency
  } else if (key === 'D' || key === 'd') {
    brushTransparency = max(brushTransparency - 10, 0); // Decrease transparency
  } else if (key === 'O' || key === 'o') {
    drawOutline = !drawOutline; // Toggle outline
  } else if (key === 'B' || key === 'b') {
    background(240); // Reset canvas
  }
}

function mousePressed() {
  currentText = inputText.value();
}
