import { Defaults } from './defaults';

export class Scene {
  ref: HTMLElement | null = null;
  height: number = Defaults.sceneHeight;
  width: number = Defaults.sceneWidth;

  constructor() {
    this.ref = document.getElementById('scene') as HTMLElement;
    this.ref.style.position = 'relative';
    this.ref.style.width = `${this.width}px`;
    this.ref.style.height = `${this.height}px`;
  }
}
