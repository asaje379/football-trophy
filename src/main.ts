import './style.css';
import { Action, actions, bindAction } from './actions';
import { Menu } from './menu';
import { Scene } from './scene';
import { Game } from './game';

function setup() {
  const menu = new Menu();
  menu.display(actions);

  const scene = new Scene();

  const scoreTemplate = document.getElementById('score');

  if (!scoreTemplate) return;
  const game = new Game(scene, scoreTemplate);

  const actionCallbacks: Record<Action, () => void> = {
    [Action.Start]: () => {
      if (!game.isStarting) game.play();
    },
    [Action.Pause]: () => {
      game.pause();
    },
    [Action.Play]: () => {
      game.resume();
    },
    [Action.ShowBestScore]: () => {},
    [Action.ToogleAudio]: () => {},
    [Action.ShowHelp]: () => {},
  };

  for (const action in actionCallbacks) {
    if (Object.prototype.hasOwnProperty.call(actionCallbacks, action)) {
      bindAction(action as Action, actionCallbacks[action as Action]);
    }
  }
}

setup();
