class GameOver {
  private gameGUI: IGameState;
  private stars: Array<Star>;
  private isActive: boolean;
  public button: p5.Element;
  public gameoverBox: p5.Element;
  private soundtrack: p5.SoundFile;
  private buttonSound: p5.SoundFile;

  constructor(gameGUI: IGameState) {
    this.gameGUI = gameGUI;
    this.isActive = false;
    this.stars = [];
    this.soundtrack = soundtrack;
    this.buttonSound = buttonClickSound;

    // CREATE GAMEOVERBOX
    this.gameoverBox = createDiv();
    this.gameoverBox.position(width / 2 - 500, height / 2 - 200);
    this.gameoverBox.size(1000, 400);
    this.gameoverBox.style("background-color", "#00f4");
    this.gameoverBox.style("border-radius", "8px");

    // CREATE PLAY AGAIN BUTTON
    this.button = createButton("PLAY AGAIN");
    this.button.position(windowWidth / 2 - 400, windowHeight / 2 + 20);
    this.button.size(280, 70);
    this.button.style("background-color", "#01c2cb");
    this.button.style("color", "white");
    this.button.style("font-family", "spaceExplorerBold");
    this.button.style("font-size", "20");
    this.button.style("border", "1px solid red");
    this.button.style("border-radius", "8px");
    this.button.style("box-shadow", "0 3px #f009");
  }

  public update() {
    this.button.mousePressed(() => {
      gameGUI.sound.playSound(this.buttonSound);
      this.changeGui;
    });

    //GO TO NEXT GUI
    this.button.mousePressed(() => {
      this.isActive = false;
      this.button.hide();
      this.gameoverBox.hide();
      gameGUI.sound.stopSound(this.soundtrack);
      this.gameGUI.updateGUI("play");
    });

    gameGUI.sound.update();
  }

  public draw() {
    // GUI SETUP
    if (this.isActive === false) {
      this.createStars();
      gameGUI.sound.loopSound(this.soundtrack);
      this.isActive = true;
    }

    for (let star of this.stars) {
      star.draw();
    }

    this.createElements();

    //DRAW HIGHSCORE CHART
    gameGUI.highscoreChart.draw();

    //GO TO NEXT GUI
    this.button.mousePressed(() => {
      this.isActive = false;
      this.button.hide();
      this.gameoverBox.hide();
      gameGUI.sound.stopSound(this.soundtrack);
      this.gameGUI.updateGUI("play");
    });
  }

  private createElements() {
    this.gameoverBox.show();
    this.button.show();

    // CREATE TEXT
    push();
    fill("#CCE5FF");
    noStroke();
    textSize(150);
    textFont(spaceExplorerHeading);
    textAlign(CENTER);
    text("GAME OVER", width / 2 + 3, 180);
    fill("red");
    text("GAME OVER", width / 2, 180);
    textAlign(LEFT);
    textFont(spaceExplorerBold);
    fill("white");
    textSize(20);
    text("YOU REACHED:", width / 2 - 398, height / 2 - 100);
    fill("red");
    textSize(35);
    let score = this.gameGUI.highscoreChart.currentScore.toFixed();
    text(score + " 000 L-Y", width / 2 - 398, height / 2 - 50);
    pop();

    gameGUI.highscoreChart.draw();
  }

  // CREATE STARS
  private createStars() {
    for (let i = 0; i < 1000; i++) {
      this.stars.push(new Star());
    }
  }

  // CHANGE GUI TO PLAY
  private changeGui = () => {
    this.gameGUI.updateGUI("play");
    this.button.hide();
  };
}
