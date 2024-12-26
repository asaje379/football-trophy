import { Defaults } from "./defaults";
import { Movable } from "./movable";

export class Ball extends Movable {
  speed = 2;
  interval: number = 0;
  isPaused = false;
  collisionsOptions: { target: Movable; callback: () => void }[] = [];
  gameOverFn: () => void = () => console.log("Game over!");

  constructor() {
    super({
      svg: `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-volleyball"><path d="M11.1 7.1a16.55 16.55 0 0 1 10.9 4"/><path d="M12 12a12.6 12.6 0 0 1-8.7 5"/><path d="M16.8 13.6a16.55 16.55 0 0 1-9 7.5"/><path d="M20.7 17a12.8 12.8 0 0 0-8.7-5 13.3 13.3 0 0 1 0-10"/><path d="M6.3 3.8a16.55 16.55 0 0 0 1.9 11.5"/><circle cx="12" cy="12" r="10"/></svg>`,
      height: Defaults.ballSize,
      width: Defaults.ballSize,
    });

    if (this.ref) {
      this.move(Math.floor(Math.random() * 3), 0);
      this.ref.style.transition = "0.2s";
    }
  }

  startAnimation() {
    this.interval = setInterval(() => {
      if (this.isPaused) return;
      if (
        this.currentPosition.y >
        Defaults.sceneHeight + 3 * Defaults.ballSize
      ) {
        clearInterval(this.interval);
        this.remove();
        this.gameOverFn();
      }

      this.move(this.currentPosition.x, this.currentPosition.y + 1);
      this.checkCollisions();
    }, this.speed);
  }

  getDirectionOffset() {
    if (this.currentPosition.x === 0) {
      return -1;
    }

    if (this.currentPosition.x === 2) {
      return 1;
    }

    return [-1, 1][Math.floor(Math.random() * 2)];
  }

  changeDirection() {
    clearInterval(this.interval);
    if (this.ref) {
      this.ref.style.transition = "0.8s";
    }

    const directionOffset = this.getDirectionOffset();

    this.move(
      this.currentPosition.x + 2 * directionOffset,
      this.currentPosition.y - 6 * Defaults.ballSize
    );
    setTimeout(() => {
      this.remove();
    }, 800);
  }

  onCollisionWith(target: Movable, callback: () => void) {
    this.collisionsOptions.push({ target, callback });
  }

  checkCollisions() {
    for (const option of this.collisionsOptions) {
      if (
        this.currentPosition.x === option.target.currentPosition.x &&
        this.currentPosition.y - this.height === option.target.currentPosition.y
      ) {
        option.callback();
      }
    }
  }

  onGameOver(fn: () => void) {
    this.gameOverFn = fn;
  }
}
