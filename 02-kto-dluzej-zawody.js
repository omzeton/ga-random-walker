import { default as p5Class } from "p5";
import "./style.css";

const getRandomEl = arr => arr[Math.floor(Math.random() * arr.length)];

const p5 = new p5Class(() => {});

const width = 2560;
const height = 1440;

const bgColor = "#eee";
const colors = ["#904E55", "#564E58", "#7EBDC2", "#2A2B2A", "#BB4430", "#439A86"];

let lineLength;
let lastPos = { x: null, y: null };

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

p5.setup = () => {
  p5.createCanvas(width, height);
  p5.background(bgColor);
};

p5.draw = () => {
  if (colors.length > 0) {
    lineLength = p5.random(5, 40);
    p5.stroke(colors[0]);

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
      colors.shift();
    } else {
      lastPos = { x: x2, y: y2 };
    }
  } else {
    p5.noLoop();
    console.log("Finished!");
  }
};

p5.keyTyped = () => {
  if (p5.key === "s" || p5.key === "S") {
    p5.saveCanvas(`palette-${new Date().toISOString()}`, "png");
  }
};
