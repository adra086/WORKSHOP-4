# WORKSHOP 4 - Interactive Painting Canvas
### https://github.com/adra086/WORKSHOP-4/

## Overview

This project creates an interactive painting canvas using dynamic user inputs including checkboxes, sliders, text input, and keyboard controls. Users can draw shapes or text on the canvas and customize their properties such as color, size, font, and transparency.

### User Inputs Implemented:

    Checkboxes: Select brush color (Red, Green, Blue, Random), font type, and text size.
    Sliders: Adjust the size of the shapes and text dynamically.
    Text Input: Enter custom text to be drawn on the canvas.
    Keyboard Controls: Switch between shapes, increase or decrease transparency, and toggle additional features.

## Project Features
1. Drawing Shapes

    Users can draw circles, rectangles, or triangles using the mouse and switch shapes using the keyboard.

2. Customizable Brush Color

    Users can select from Red, Green, Blue, or Random colors using checkboxes.

3. Dynamic Text Rendering

    Users can type text using the input box and customize the font (Arial, Courier New, or Georgia) and text size (small, medium, large).

4. Transparency Control

    Press 'A' to increase transparency and 'D' to decrease it.

## Code Explanation
### 1. Setting Up the Canvas and User Inputs

```javascript
function setup() {
  createCanvas(600, 400);
  background(240);

  '' Slider for brush size
  createP('Brush Size:').position(10, 10);
  sliderSize = createSlider(10, 100, 20);
  sliderSize.position(100, 20);

  // Text input for user text
  createP('Enter Text to Draw:').position(10, 50);
  inputText = createInput();
  inputText.position(150, 60);

  // Checkboxes for color selection
  createP('Select Brush Color:').position(10, 90);
  checkboxRed = createCheckbox('Red', false).position(150, 100).changed(deselectOtherColors);
  checkboxGreen = createCheckbox('Green', false).position(220, 100).changed(deselectOtherColors);
  checkboxBlue = createCheckbox('Blue', false).position(290, 100).changed(deselectOtherColors);
  checkboxRandom = createCheckbox('Random', false).position(360, 100).changed(deselectOtherColors);

  // Checkboxes for font selection
  createP('Select Font:').position(10, 140);
  fontArial = createCheckbox('Arial', true).position(150, 150).changed(deselectOtherFonts); // Default font
  fontCourier = createCheckbox('Courier New', false).position(220, 150).changed(deselectOtherFonts);
  fontGeorgia = createCheckbox('Georgia', false).position(340, 150).changed(deselectOtherFonts);

  // Checkboxes for text size
  createP('Select Text Size:').position(10, 180);
  sizeSmall = createCheckbox('Small (15px)', false).position(150, 190).changed(deselectOtherSizes);
  sizeMedium = createCheckbox('Medium (30px)', true).position(260, 190).changed(deselectOtherSizes); // Default size
  sizeLarge = createCheckbox('Large (50px)', false).position(400, 190).changed(deselectOtherSizes);
}
```

### 2. Drawing Shapes and Text with Dynamic Properties

```javascript
function draw() {
  let size = sliderSize.value();
  setBrushColor();  // Determine brush color dynamically

  if (mouseIsPressed) {
    if (drawOutline) {
      stroke(0);
    } else {
      noStroke();
    }
    fill(selectedColor[0], selectedColor[1], selectedColor[2], brushTransparency);

    // Draw the selected shape
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

  // Draw text with the selected font, size, and color
  if (currentText !== "") {
    textSize(getTextSize());
    textFont(getSelectedFont());
    textAlign(CENTER, CENTER);
    fill(selectedColor[0], selectedColor[1], selectedColor[2], brushTransparency);
    text(currentText, mouseX, mouseY);
  }
}
```

### 3. Dynamic Selection of Fonts, Colors, and Text Sizes

```javascript
// Determine the brush color based on user-selected checkboxes
function setBrushColor() {
  if (checkboxRandom.checked()) {
    selectedColor = [random(255), random(255), random(255)];
  } else if (checkboxRed.checked()) {
    selectedColor = [255, 0, 0];  // Red
  } else if (checkboxGreen.checked()) {
    selectedColor = [0, 255, 0];  // Green
  } else if (checkboxBlue.checked()) {
    selectedColor = [0, 0, 255];  // Blue
  } else {
    selectedColor = [0, 0, 0];  // Default black
  }
}

// Get the selected font based on user input
function getSelectedFont() {
  if (fontCourier.checked()) {
    return 'Courier New';
  } else if (fontGeorgia.checked()) {
    return 'Georgia';
  } else {
    return 'Arial';  // Default font
  }
}

// Get the selected text size based on user input
function getTextSize() {
  if (sizeSmall.checked()) {
    return 15;
  } else if (sizeLarge.checked()) {
    return 50;
  } else {
    return 30;  // Default size
  }
}
```

## Project Screenshots

    1. Initial canvas with checkboxes and input options
    ![image](https://github.com/user-attachments/assets/4329f162-a1ec-456d-84b7-852af24e6f2d)
    
    2. Example with shapes and text using different fonts and sizes
    ![image](https://github.com/user-attachments/assets/5dcf9662-a7ec-4b8b-aabb-702f7e0b12d9)
    - This example uses the word 'text' in red colour and Arial Font 
    ![image](https://github.com/user-attachments/assets/ca278a3f-5017-4057-8ad7-23828c862ffc)
    - This example uses the word 'text' in blue colour and Courier New Font
    ![image](https://github.com/user-attachments/assets/cce305c9-612a-4e5a-b494-0675f8d36a60)
    - This example uses the word 'text' at Large text size, with random colours in Georgia Font. 
    ![image](https://github.com/user-attachments/assets/6bd8383b-a35a-4688-a8f6-300c6a2a5512)
    - This example uses Triangles with random brush colours.
    ![image](https://github.com/user-attachments/assets/f6e35466-ed89-4f54-aa22-4a8e4c487cd9)
    - This example uses Rectangles that are green.
    ![image](https://github.com/user-attachments/assets/c3c6bd9c-1057-40a7-b9ce-515571e9418f)
    - This example uses Circles that are blue.
    
    3. Transparency effects with shapes and text
    These examples show the decrease and increase transparency effect on text and shapes: 
    ![image](https://github.com/user-attachments/assets/e0d16f2e-73f9-4e03-a0bb-b3ab49541428)
    ![image](https://github.com/user-attachments/assets/806d47a1-f3e5-40e3-931d-8dcc08af1c1f)
   

## Problem-Solving and Feedback
### Issues Encountered

    Initially, the text color and transparency were not working correctly because the text was hardcoded to black (fill(0)).
    I fixed this by applying the selected color and transparency using the fill() function with dynamic RGB and alpha values.
    I also struggled to make sure the buttons were not pressing more than one at once. 

### Feedback Implemented

    Added exclusive checkbox selection for colors, fonts, and text sizes so that only one option can be active at a time.
    Improved interactivity with additional keyboard controls for better user experience.
    I had to make exclusive keyboard controls for this. 

### Ideas for Future Development

    Allow users to select multiple colors and blend them dynamically.
    Add more font and shape options (e.g., stars or custom shapes).
    Enable saving the canvas as an image with a Save button.
    Introduce a color picker instead of checkboxes for more flexibility.

## Helpful Resources

    p5.js Reference Documentation
    Canvas Workshop Tutorials as well as mremily9 exemplar repository was helpful in informing how to format checkboxes
    ChatGPT: Assisted in solving dynamic input issues and improving the interaction flow.
    p5.js YouTube tutorials: Provided examples for checkboxes, sliders, and text rendering.
