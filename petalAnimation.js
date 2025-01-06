const canvas = document.getElementById("petalCanvas");
const ctx = canvas.getContext("2d");

let width, height;
const petals = [];
const numPetals = 15;

// Resize canvas to fit window
function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Petal class
class Petal {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * width;
    this.y = Math.random() * -height;
    this.size = Math.random() * 5 + 2;
    this.speed = Math.random() * 1 + 0.08;
    this.angle = Math.random() * Math.PI * 2;
    this.spin = Math.random() * 0.1 - 0.05;
  }

  update() {
    this.y += this.speed;
    this.angle += this.spin;

    if (this.y > height) {
      this.reset();
    }
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.fillStyle = "rgba(255, 182, 193, 0.8)"; // Light pink
    ctx.beginPath();
    ctx.moveTo(0, -this.size);
    ctx.quadraticCurveTo(this.size, -this.size, this.size, 0);
    ctx.quadraticCurveTo(this.size, this.size, 0, this.size);
    ctx.quadraticCurveTo(-this.size, this.size, -this.size, 0);
    ctx.quadraticCurveTo(-this.size, -this.size, 0, -this.size);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}

// Initialize petals
for (let i = 0; i < numPetals; i++) {
  petals.push(new Petal());
}

// Animation loop
function animate() {
  ctx.clearRect(0, 0, width, height);
  petals.forEach((petal) => {
    petal.update();
    petal.draw();
  });
  requestAnimationFrame(animate);
}
animate();
