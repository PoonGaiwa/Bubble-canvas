/*
 * @Author: gaiwa gaiwa@163.com
 * @Date: 2023-08-29 20:08:11
 * @LastEditors: gaiwa gaiwa@163.com
 * @LastEditTime: 2023-08-29 21:46:30
 * @FilePath: \html\work\mobile\canvas\js\canvas.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const COLORS = ['#69D2E7','#A7DBD8','#E0E4CC','#F38630','#FA6900','#FF4E50','#F9D423'];
let particles = [];

class Particle {
  static ctx = context;
  constructor({x = 0, y = 0,r = 3,color = '#F9D423'} = {}){
    this.init({x, y, r, color})
  }
  init({x, y, r, color}){
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;
    this.th = random(0, Math.PI *2);
    this.vx = Math.sin(this.th) * 4;
    this.vy = Math.cos(this.th) * 4;
  }
  update(){
    this.x += this.vx;
    this.y += this.vy;
    this.vx += this.vx * Math.cos(this.th) *.1;
    this.vy += this.vy * Math.sin(this.th) *.1;
    this.vx *= .92;
    this.vy *= .92;
    this.r *= .96;
    this.draw();
  }
  draw(){
    Particle.ctx.beginPath();
    Particle.ctx.fillStyle = this.color;
    Particle.ctx.globalCompositeOperation = 'lighters';
    Particle.ctx.arc(this.x,this.y,this.r, Math.PI *2, false);
    Particle.ctx.fill();
  }
}

function resize(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
function init(){
  resize();
}
function random(min, max){
  if(Array.isArray(min)){
    return min[~~(Math.random() * min.length)];
  }
  return min + ~~(Math.random() * (max-min));
}
function spawn(x, y){
  let particle = new Particle({
    x: x,
    y: y,
    color: random(COLORS),
    r: random(10, 60)
  });
  particles.push(particle);
  if(particles.length >= 800){
    particles.shift();
  }
}

init();
window.addEventListener('resize',resize,false);
canvas.addEventListener('mousemove',function(e){
  let eX = e.clientX, eY = e.clientY;
  for(let i = 0; i<random(0,50); i++){
    spawn(eX, eY);
  }
},false);

render();
function render(){
  context.clearRect(0,0,canvas.width,canvas.height)
  particles.forEach(item=>{
    item.update();
  })
  requestAnimationFrame(render);
}

