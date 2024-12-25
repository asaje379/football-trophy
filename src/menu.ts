import { Action } from './actions';

export class Menu {
  private createMenuItem(action: Action, label: string) {
    const menuItem = document.createElement('button');
    menuItem.id = action;
    menuItem.textContent = label;
    return menuItem;
  }

  display(actions: Record<Action, string>) {
    const menu = document.getElementById('menu') as HTMLDivElement;
    if (!menu) {
      return document.createElement('div');
    }

    for (const action in actions) {
      const menuItem = this.createMenuItem(
        action as Action,
        actions[action as Action],
      );
      menu.appendChild(menuItem);
    }
  }
}
