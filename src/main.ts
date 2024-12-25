import './style.css';
import { actions } from './actions';
import { Menu } from './menu';
import { Scene } from './scene';
import { Game } from './game';

function setup() {
  const menu = new Menu();
  menu.display(actions);

  const scene = new Scene();

  const scoreTemplate = document.getElementById('score');

  if (scoreTemplate) {
    const game = new Game(scene, scoreTemplate);
    game.play();
  }
}

setup();
