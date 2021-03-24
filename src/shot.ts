class Shot extends GameObject {
  private stroke: p5.Color;

  constructor(x: number, y: number) {
    super();
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.stroke = color("white");
  }

  public update() {
    this.position.x = this.position.x + 15;
  }

  public draw() {
    push();
    stroke(this.stroke);
    strokeWeight(7);
    line(
      this.position.x,
      this.position.y,
      this.position.x + 3,
      this.position.y
    );
    pop();
  }

  public hits(obj: GameObject): boolean {
    let d = dist(
      this.position.x,
      this.position.y,
      obj.position.x,
      obj.position.y
    );
    if (d < obj.radius && !obj.isHit) {
      return true;
    } else {
      obj.isHit = false;
      return false;
    }
  }
}
