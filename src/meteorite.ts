class Meteorite extends GameObject {
  damage: number;
  color: p5.Color;

  // private collisionSound: string - To be added later

  constructor() {
    super();
    this.size = 0;
    this.position = createVector(random(width), random(height));
    this.velocity = createVector(10, 0);
    // this.acceleration = createVector(0, 0);
    this.damage = 5;
    this.radius = 30;
    this.color = color("red");
    // this.collisionSound = p5.SoundFile;
  }

  update() {
    this.position.sub(this.velocity);
    if (this.position.x < 0) {
      this.position.x = width;
      this.position.y = random(height);
    }
  }

  draw() {
    push();
    noStroke();
    fill(this.color);
    ellipse(this.position.x, this.position.y,this.radius*2, this.radius*2);
    pop();
  }
}
