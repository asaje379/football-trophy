import { Ball } from "./ball";
import { GoalKeeper } from "./goal-keeper";
import { Movable } from "./movable";
import { Scene } from "./scene";

export class Game {
  speed = 2;
  score = 0;
  interval = 0;
  isPlaying = true;
  isStarting = false;

  private balls: Ball[] = [];

  constructor(private scene: Scene, private scoreTemplate: HTMLElement) {
    this.init();
  }

  init() {
    document.addEventListener("visibilitychange", () =>
      this.handleVisibilityChange()
    );
  }

  renderScore() {
    this.scoreTemplate.innerHTML = String(this.score);
  }

  play() {
    this.renderScore();

    const sceneRef = this.scene.ref as HTMLElement;

    const goalKeeper = new GoalKeeper();
    goalKeeper.renderIn(sceneRef);
    goalKeeper.move(1, this.scene.height);
    goalKeeper.startListening();

    this.ballLoop(sceneRef, goalKeeper);
    this.isStarting = true;
  }

  pause() {
    this.isPlaying = false;
    this.balls.forEach((ball) => (ball.isPaused = true));
  }

  resume() {
    this.isPlaying = true;
    this.balls.forEach((ball) => (ball.isPaused = false));
  }

  ballAnimation(sceneRef: HTMLElement, target: Movable) {
    const ball = new Ball();
    ball.renderIn(sceneRef);
    ball.startAnimation();
    ball.onCollisionWith(target, () => {
      this.score++;
      this.renderScore();
      ball.changeDirection();

      if (this.score % 5 === 0) {
        this.speed -= 0.05;
        clearInterval(this.interval);

        this.ballLoop(sceneRef, target);
      }
    });

    ball.onGameOver(() => {
      this.balls = [];
      alert("Game over!");
      // reset all settings
      this.score = 0;
      this.renderScore();
      this.speed = 2;
    });
    this.balls.push(ball);
  }

  ballLoop(sceneRef: HTMLElement, target: Movable) {
    this.interval = setInterval(() => {
      if (!this.isPlaying) return;
      this.ballAnimation(sceneRef, target);
    }, this.speed * 1000);
  }

  // Vérifier si la page est visible ou cachée
  handleVisibilityChange() {
    if (document.visibilityState !== "visible") {
      this.pause();
      console.log("Paused due to inactivity");
    }
  }
}
