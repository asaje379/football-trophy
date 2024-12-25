import { Defaults } from './defaults';
import { Movable } from './movable';

export class GoalKeeper extends Movable {
  constructor() {
    super({
      svg: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-person-standing"><circle cx="12" cy="5" r="1"/><path d="m9 20 3-6 3 6"/><path d="m6 8 6 2 6-2"/><path d="M12 10v4"/></svg>`,
      height: Defaults.goalKeeperSize,
      width: Defaults.goalKeeperSize,
    });
    if (this.ref) {
      this.ref.style.transition = '0.2s';
    }
  }

  startListening() {
    const keyMap = {
      ArrowLeft: -1,
      ArrowRight: 1,
    };

    window.addEventListener('keydown', (event) => {
      const direction = keyMap[event.key as keyof typeof keyMap];
      if (direction !== undefined) {
        this.move(this.currentPosition.x + direction, this.currentPosition.y);
      }
    });
  }

  move(x: number, y: number): void {
    if (x < 0 || x > 2) {
      return;
    }
    super.move(x, y);
  }
}
