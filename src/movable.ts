import { Defaults } from './defaults';
import { Position } from './position';

interface MovableConfig {
  svg: string;
  height: number;
  width: number;
  color?: string;
  position?: Position;
}

export class Movable {
  svg: string = '';
  ref: HTMLElement | null = null;
  height: number = 0;
  width: number = 0;
  currentPosition: Position = { x: 0, y: 0 };

  constructor(config: MovableConfig) {
    this.svg = config.svg;
    this.ref = document.createElement('div');
    this.ref.innerHTML = this.svg;
    this.ref.style.position = 'absolute';
    this.ref.style.backgroundColor = 'transparent';
    this.ref.style.color = config.color ?? 'white';
    this.height = config.height;
    this.width = config.width;
    this.currentPosition = config.position ?? { x: 0, y: 0 };
  }

  protected setCurrentPosition(x: number, y: number) {
    this.currentPosition.x = x;
    this.currentPosition.y = y;
  }

  renderIn(container: HTMLElement) {
    if (this.ref) {
      container.appendChild(this.ref);
    }
  }

  remove() {
    if (this.ref && this.ref.parentElement) {
      this.ref.parentElement.removeChild(this.ref);
    }
  }

  move(x: number, y: number) {
    this.setCurrentPosition(x, y);

    const rangeWidth = Defaults.sceneWidth / 3;

    if (this.ref) {
      this.ref.style.left = `${
        x * rangeWidth + rangeWidth / 2 - this.width / 2
      }px`;
      this.ref.style.top = `${y - this.height}px`;
    }
  }
}
