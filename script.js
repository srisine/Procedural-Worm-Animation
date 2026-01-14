var canvas = document.getElementById("board");
var ctx = canvas.getContext("2d");
    
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;

let head = { x: 300, y: 300 };
const radius = 5;
const size = [];
const count = 100;

let minSize = 1;
let maxSize = 40;
const n = (count-1)/2;
for(let i=0; i<count; ++i){
    let t = 1 - Math.abs(n - i) / n;
    size[i] = minSize + t * (maxSize - minSize);
}

let circles = [];

for (let i = 0; i < count; i++) {
    circles.push({ x: head.x, y: head.y });
}

function calcCircles(){
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

        curr.x = prev.x+dx*size[i];
        curr.y = prev.y+dy*size[i];
        //curr.x = prev.x+dx*radius;
        //curr.y = prev.y+dy*radius;
    }
}

function drawCircles(){
    ctx.clearRect(0,0,canvas.width, canvas.height);

    for(let i=0; i<count; ++i){
        ctx.beginPath();
        ctx.arc(circles[i].x, circles[i].y, size[i], 0, 2 * Math.PI);
        //ctx.arc(circles[i].x, circles[i].y, radius, 0, 2 * Math.PI);
        ctx.stroke();
    }
}

function frame(){
    calcCircles();
    drawCircles();
    canvas.addEventListener("mousemove", e => {
        head.x = e.clientX;
        head.y = e.clientY;
    });
    setTimeout(frame, 1000/60);
}
setTimeout(frame, 1000/60);
