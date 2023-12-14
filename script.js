const link = document.getElementById('link');

let canvasText = '교훈';

let pt = 45;
let width = 600;
let height = 450;

let text = '%교훈4717 ' + `${pt} ` + `${width} ` + `${height} `;

function getText() {
    text = '%교훈4717 ' + `${pt} ` + `${width} ` + `${height} `;
    text+=document.getElementById('textinput').value;

    link.download = `${String(document.getElementById('textinput').value)}.ghn`;

    let encoder = new TextEncoder();
    let uint8Array = Object.values(encoder.encode(text));

    let binary = uint8Array.map(element => {
      return Number(element).toString(2);
    });

    let blob = new Blob([binary.join(' ')]);

    link.href = URL.createObjectURL(blob);

    text-=document.getElementById('textinput').value;
}

function chageSelect(v){
  if(v == 'ghn 파일') {
    link.click();
  }
  if(v == 'png 파일') {
    const image = canvas.toDataURL();
    const link = document.querySelector('#png');
    link.href = image;
    link.download = `${String(document.getElementById('textinput').value)}.png`;
    link.click();
  }
}

let gyohwun;

function readFile(input) {
  let file = input.files[0];
  let reader = new FileReader();

  reader.readAsText(file);

  reader.onload = function() {
    let result = reader.result.split(' ');

    let gyohwun = new Uint8Array(result.map(element => {
      return parseInt(element, 2);
    }));

    let decoded = new TextDecoder().decode(gyohwun).split(' ');

    pt = decoded[1];
    width = decoded[2];
    height = decoded[3];
    canvasText = decoded.slice(4).join(' ');
    draw();

    if(decoded[0] === '%교훈4717') {
    } else {
      alert('잘못된 파일 형식입니다.');
    }
  }
}

const zz = document. querySelector('#zz');

const canvas = document.querySelector("canvas");

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

canvas.setAttribute("width", window.innerWidth);
canvas.setAttribute("height", window.innerHeight);

const ctx = canvas.getContext('2d');

function draw() {

  ctx.clearRect(0, 0, windowWidth, windowHeight);

  let xOrigin = (windowWidth/2)-(width/2)-100;
  let yOrigin = ((windowHeight/2)-(height/2))-100;

  ctx.fillStyle = 'burlywood';
  ctx.fillRect(xOrigin, yOrigin, width, height);

  ctx.fillStyle = 'white';
  ctx.fillRect((width/2)-((width/1.35)/2)+xOrigin, (height/2)-((height/1.1)/2)+yOrigin, width/1.35, height/1.1);

  ctx.font = `${pt}px serif`;
  ctx.textAlign = 'center';
  ctx.fillStyle = 'black';
  ctx.fillText(canvasText, (width/2)+xOrigin, (height/2)+yOrigin);
}

draw();

function reDraw(value) {
  width = value;
  getText();
  draw();
}

function reDraw1(value) {
  height = value;
  getText();
  draw();
}

function reDraw2(value) {
  canvasText = value;
  getText();
  draw();
}