// hud.js - Container for showing player stats

import LifeBar from '../components/life-bar';

class Hud {

  constructor(game, sprite) {
    this.game = game;

    const options = {
        x: 10,
        y: 10,
        fixedToCamera: true
    };
    this._lifebar = new LifeBar(game, sprite, options);
  }

  update() {
    this._lifebar.update();
  }

}

export default Hud;
