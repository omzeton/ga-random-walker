import { default as p5Class } from "p5";
import "./style.css";

const getRandomEl = arr => arr[Math.floor(Math.random() * arr.length)];

const p5 = new p5Class(() => {});

const bgColor = "#BFB48F";

const width = 2560;
const height = 1440;

let lineLength = 100;

let cycle = 0;
const colorCycle = 1000;
let colorIndex = 0;
const colors = ["#904E55", "#564E58"];

let lastPos = { x: null, y: null };

p5.setup = () => {
  p5.createCanvas(width, height);
  p5.background(bgColor);
};

const moveTop = (x, y) => ({ x, y: (y += lineLength) });
const moveTopRight = (x, y) => ({ x: (x += lineLength), y: (y += lineLength) });
const moveRight = (x, y) => ({ x: (x += lineLength), y });
const moveBottomRight = (x, y) => ({ x: (x += lineLength), y: (y -= lineLength) });
const moveBottom = (x, y) => ({ x, y: (y -= lineLength) });
const moveBottomLeft = (x, y) => ({ x: (x -= lineLength), y: (y -= lineLength) });
const moveLeft = (x, y) => ({ x: (x -= lineLength), y });
const moveTopLeft = (x, y) => ({ x: (x -= lineLength), y: (y += lineLength) });

// const getRandomPosition = (x, y) => getRandomEl([moveTop, moveTopRight, moveRight, moveBottomRight, moveBottom, moveBottomLeft, moveLeft, moveTopLeft])(x, y);
// const getRandomPosition = (x, y) => getRandomEl([moveTopRight, moveBottomRight, moveBottomLeft, moveTopLeft])(x, y);
const getRandomPosition = (x, y) => getRandomEl([moveTop, moveRight, moveBottom, moveLeft])(x, y);

p5.draw = () => {
  cycle += 1;
  lineLength = p5.random(5, 30);

  if (cycle >= colorCycle) {
    cycle = 0;
    if (colorIndex === colors.length - 1) {
      colorIndex = 0;
    } else {
      colorIndex += 1;
    }
  }

  p5.stroke(colors[colorIndex]);

  let x1, y1, x2, y2;

  if (lastPos.x === null && lastPos.y === null) {
    x1 = width / 2;
    y1 = height / 2;
    x2 = width / 2 + lineLength;
    y2 = height / 2;
  } else {
    x1 = lastPos.x;
    y1 = lastPos.y;
    const newPos = getRandomPosition(x1, y1);
    x2 = newPos.x;
    y2 = newPos.y;
  }
  p5.line(x1, y1, x2, y2);
  if (x2 >= width || x2 <= 0 || y2 >= height || y2 <= 0) {
    lastPos = { x: null, y: null };
  } else {
    lastPos = { x: x2, y: y2 };
  }
};

p5.keyTyped = () => {
  if (p5.key === "s" || p5.key === "S") {
    p5.saveCanvas(`palette-${new Date().toISOString()}`, "png");
  }
};
