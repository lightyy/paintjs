const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#000000";
const CANVAS_SIZE = 500;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.strokeStyle = "INITIAL_COLOR";
ctx.lineWidth = 2.5;

//최초 background color를 white로 지정
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.fillStyle = "INITIAL_COLOR";

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    // console.log(x, y);
    ctx.beginPath();
    // ctx.moveTo(x, y);
  } else {
    // console.log(x, y);
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleColorClick(event) {
  // console.log(event.target.style.backgroundColor);
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  const value = event.target.value;
  ctx.lineWidth = value;
}

function handleModeClick() {
  if (filling) {
    filling = false;
    mode.innerText = "fill";
  } else {
    filling = true;
    mode.innerText = "paint";
  }
}

function handleCanvasFill() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleCM(event) {
  //우클릭방지
  event.preventDefault();
}

function hadleSaveClick(event){
  const image = canvas.toDataURL("");
  // console.log(image);
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS[😀]";
  // console.log(link);
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("mousedown", handleCanvasFill);
  //save
  canvas.addEventListener("contextmenu", handleCM);
}
//Array.from(colors) : 배열로 바꿔줌? arrow function?
Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", hadleSaveClick);
}
