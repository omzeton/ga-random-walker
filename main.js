import { default as p5Class } from "p5";
import colors from "nice-color-palettes";
import "./style.css";

const getRandomEl = arr => arr[Math.floor(Math.random() * arr.length)];

const palette = colors[Math.floor(Math.random() * colors.length)];
const firstColor = palette[0];
const otherColors = palette.slice(0);

const p5 = new p5Class(() => {});

const width = window.innerWidth;
const height = window.innerHeight;

const circleRadius = 550;

let lineLength;

const getRandomColor = () => {
  return {
    r: p5.random(255),
    g: p5.random(255),
    b: p5.random(255),
  };
};

const getRandomGrey = () => {
  const c = p5.random(255);
  return {
    r: c,
    g: c,
    b: c,
  };
};

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
  // return getRandomEl([moveTopRight, moveTopLeft, moveBottomRight, moveBottomLeft])(x, y);
  // return getRandomEl([moveTop, moveRight, moveBottom, moveLeft])(x, y);
  return getRandomEl([moveTop, moveTopRight, moveRight, moveBottomRight, moveBottom, moveBottomLeft, moveLeft, moveTopLeft])(x, y);
}

function euclideanDistance(vec1, vec2) {
  const d1 = vec1.x - vec2.x;
  const d2 = vec1.y - vec2.y;
  return Math.sqrt(Math.pow(d1, 2) + Math.pow(d2, 2));
}

class Walker {
  constructor(color) {
    this.color = color;
    this.lastPos = { x: null, y: null };
  }

  draw() {
    p5.stroke(this.color);
    let x1, y1, x2, y2;
    if (this.lastPos.x === null && this.lastPos.y === null) {
      x1 = width / 2;
      y1 = height / 2;
      x2 = x1;
      y2 = y1;
    } else {
      x1 = this.lastPos.x;
      y1 = this.lastPos.y;
      const newPos = getRandomPosition(x1, y1);
      x2 = newPos.x;
      y2 = newPos.y;
    }
    p5.line(x1, y1, x2, y2);

    const distanceFromCenter = euclideanDistance({ x: width / 2, y: height / 2 }, { x: x2, y: y2 });

    if (distanceFromCenter >= circleRadius) {
      this.lastPos = { x: null, y: null };
    } else {
      this.lastPos = { x: x2, y: y2 };
    }
  }
}

const walkerArr = [];

p5.setup = () => {
  p5.createCanvas(width, height);
  p5.background(firstColor);

  for (let i = 0; i <= 1000; i++) {
    walkerArr.push(new Walker(otherColors[Math.floor(Math.random() * otherColors.length)]));
  }
  for (let i = 0; i <= 10; i++) {
    walkerArr.push(new Walker(otherColors[Math.floor(Math.random() * otherColors.length)]));
  }
  // for (let i = 0; i <= 10; i++) {
  //   walkerArr.push(new Walker({ r: 91, g: 133, b: 170 }));
  // }
};

p5.draw = () => {
  // lineLength = p5.random(1, 10);
  lineLength = 3;
  for (const walker of walkerArr) {
    walker.draw();
  }
  // p5.noFill();
  // p5.stroke("#0f0");
  // p5.circle(width / 2, height / 2, circleRadius * 2);
};

p5.keyTyped = () => {
  if (p5.key === "s" || p5.key === "S") {
    p5.saveCanvas(`palette-${new Date().toISOString()}`, "png");
  }
};
