// setup canvas

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// function to generate random number

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random color

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

class Ball {
  constructor(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  update() {
    if (this.x + this.size >= width) {
      this.velX = -this.velX;
    }

    if (this.x - this.size <= 0) {
      this.velX = -this.velX;
    }

    if (this.y + this.size >= height) {
      this.velY = -this.velY;
    }

    if (this.y - this.size <= 0) {
      this.velY = -this.velY;
    }

    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect() {
    for (const ball of balls) {
      if (this !== ball) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.color = this.color = randomRGB();
        
        //Attempt at realistic collision - sorta works but balls get stuck sometimes
        
        //   let v1X = ball.velX;
        //   let v1Y = ball.velY
        //   let m1 = ball.size;

        //   let v2X = this.velX;
        //   let v2Y = this.velY
        //   let m2 = this.size;

        //   ball.velX = (2*m2*v2X + v1X*(m1-m2))/(m1 + m2);
        //   ball.velY = (2*m2*v2Y + v1Y*(m1-m2))/(m1 + m2);

        //   this.velX = (2*m1*v1X + v2X*(m2-m1))/(m1 + m2);
        //   this.velY = (2*m1*v1Y + v2Y*(m2-m1))/(m1 + m2);

        //   ball.velX = ((m1*v1X + m2*v2X) - m2*(v1X-v2X))/(m1 + m2);
        //   ball.velY = ((m1*v1Y + m2*v2Y) - m2*(v1Y-v2Y))/(m1 + m2);

        //   this.velX = ((m1*v1X + m2*v2X) - m1*(v2X-v1X))/(m1 + m2);
        //   this.velY = ((m1*v1Y + m2*v2Y) - m1*(v2Y-v1Y))/(m1 + m2);
        }
      }
    }
  }
}

const balls = [];

while (balls.length < 25) {
  const size = random(20, 30);
  const ball = new Ball(
    // ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size,
  );

  balls.push(ball);
}

function loop() {
  ctx.fillStyle = "rgb(0 0 0 / 25%)";
  ctx.fillRect(0, 0, width, height);

  for (const ball of balls) {
    ball.draw();
    ball.update();
    ball.collisionDetect();
  }

  requestAnimationFrame(loop);
}

loop();
