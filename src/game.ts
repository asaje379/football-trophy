import { Ball } from './ball';
import { GoalKeeper } from './goal-keeper';
import { Movable } from './movable';
import { Scene } from './scene';

export class Game {
  speed = 2;
  score = 0;
  interval = 0;

  constructor(private scene: Scene, private scoreTemplate: HTMLElement) {}

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
      alert('Game over!');
    });
  }

  ballLoop(sceneRef: HTMLElement, target: Movable) {
    this.interval = setInterval(() => {
      this.ballAnimation(sceneRef, target);
    }, this.speed * 1000);
  }
}
