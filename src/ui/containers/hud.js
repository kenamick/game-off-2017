// hud.js - Container for showing player stats

import LifeBar from '../components/life-bar';

class Hud {

  constructor(game) {
    this.game = game;

    this._lifebar = new LifeBar(game, 10, 10);
  }

  update() {
    this._lifebar.update();
  }

}

export default Hud;
