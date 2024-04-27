import { default as p5Class } from "p5";
import "./style.css";

const getRandomEl = arr => arr[Math.floor(Math.random() * arr.length)];

const p5 = new p5Class(() => {});

const bgColor = "#fff";

const width = 1500;
const height = 1500;

let lineLength = 10;

const getRandomColor = () => ({
  r: p5.random(255),
  g: p5.random(255),
  b: p5.random(255),
});

function moveTop(x, y) {
  return { x, y: (y += lineLength) };
}
function moveTopRight(x, y) {
  return { x: (x += lineLength), y: (y += lineLength) };
}
function moveRight(x, y) {
  return { x: (x += lineLength), y };
}
function moveBottomRight(x, y) {
  return { x: (x += lineLength), y: (y -= lineLength) };
}
function moveBottom(x, y) {
  return { x, y: (y -= lineLength) };
}
function moveBottomLeft(x, y) {
  return { x: (x -= lineLength), y: (y -= lineLength) };
}
function moveLeft(x, y) {
  return { x: (x -= lineLength), y };
}
function moveTopLeft(x, y) {
  return { x: (x -= lineLength), y: (y += lineLength) };
}
function getRandomPosition(x, y) {
  return getRandomEl([moveTopRight, moveTopLeft, moveBottomRight, moveBottomLeft])(x, y);
  // return getRandomEl([moveTop, moveRight, moveBottom, moveLeft])(x, y);
  // return getRandomEl([moveTop, moveTopRight, moveRight, moveBottomRight, moveBottom, moveBottomLeft, moveLeft, moveTopLeft])(x, y);
}

class Walker {
  constructor(color) {
    this.color = color;
    this.lastPos = { x: null, y: null };
  }

  draw() {
    p5.stroke(this.color.r, this.color.g, this.color.b);
    let x1, y1, x2, y2;
    if (this.lastPos.x === null && this.lastPos.y === null) {
      x1 = width / 2;
      y1 = height / 2;
      x2 = width / 2 + lineLength;
      y2 = height / 2;
    } else {
      x1 = this.lastPos.x;
      y1 = this.lastPos.y;
      const newPos = getRandomPosition(x1, y1);
      x2 = newPos.x;
      y2 = newPos.y;
    }
    p5.line(x1, y1, x2, y2);
    if (x2 >= width || x2 <= 0 || y2 >= height || y2 <= 0) {
      this.lastPos = { x: null, y: null };
    } else {
      this.lastPos = { x: x2, y: y2 };
    }
  }
}

const walkerArr = [];

p5.setup = () => {
  p5.createCanvas(width, height);
  p5.background(bgColor);
  for (let i = 0; i <= 10; i++) {
    walkerArr.push(new Walker(getRandomColor()));
  }
};

p5.draw = () => {
  // lineLength = p5.random(5, 30);
  for (const walker of walkerArr) {
    walker.draw();
  }
};

p5.keyTyped = () => {
  if (p5.key === "s" || p5.key === "S") {
    p5.saveCanvas(`palette-${new Date().toISOString()}`, "png");
  }
};
