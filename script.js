var canvas = document.getElementById("board");
var ctx = canvas.getContext("2d");
    
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;

let head = { x: 300, y: 300 };

const size = [];
const count = 100;        
let minSize = 1;
let maxSize = 10;
const n = (count-1)/2;
for(let i=0; i<count; ++i){
    let t = 1 - Math.abs(n - i) / n;
    size[i] = minSize + t * (maxSize - minSize);
}

let circles = [];
let left = [];
let right = [];

for (let i = 0; i < count; i++) {
    circles.push({ x: head.x, y: head.y });
}

function calcCircles(){
    left.length = 0;
    right.length = 0;

    circles[0].x = head.x;
    circles[0].y = head.y;
    for(let i=1; i<count; ++i){
        let prev = circles[i-1];
        let curr = circles[i];
        
        let dx = curr.x-prev.x;
        let dy = curr.y-prev.y;

        let len = Math.sqrt(dx*dx+dy*dy);
        if(len!=0){
            dx /= len;
            dy /= len;
        }
        
        let nx = -dy;
        let ny = dx;

        curr.x = prev.x+dx*size[i];
        curr.y = prev.y+dy*size[i];
        
        right.push({x: curr.x - nx * size[i], y: curr.y - ny * size[i]});
        left.push({x: curr.x + nx * size[i], y: curr.y + ny * size[i]});
    }
}

function drawCircles(){
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    ctx.beginPath();
    ctx.moveTo(left[0].x, left[0].y);
    for (let p of left) {
        ctx.lineTo(p.x, p.y);
    }
    for (let i = right.length - 1; i >= 0; i--) {
        ctx.lineTo(right[i].x, right[i].y);
    }
    ctx.fillStyle = "#88cc88";
    ctx.fill();
    ctx.closePath();
    ctx.stroke();

}

function frame(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    calcCircles();
    drawCircles();
    canvas.addEventListener("mousemove", e => {
        head.x = e.clientX;
        head.y = e.clientY;
    });
    setTimeout(frame, 1000/60);
}
setTimeout(frame, 1000/60);
