// hud.js - Container for showing player stats

import HealthBar from '../components/health-bar';

class Hud {

  constructor(game, sprite) {
    this.game = game;

    const options = {
        x: 10,
        y: 10,
        fixedToCamera: true
    };
    this._healthbar = new HealthBar(game, sprite, options);
  }

  update() {
    this._healthbar.update();
  }

}

export default Hud;
