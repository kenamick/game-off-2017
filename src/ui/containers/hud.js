// hud.js - Container for showing player stats

import HealthBar from '../components/health-bar';
import GoHand from '../components/go-hand';

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

  showThisWay() {
    this.hand = new GoHand(this.game);
  }

  hideThisWay() {
    this.hand.sprite.destroy();
  }

  update() {
    this._healthbar.update();
  }

}

export default Hud;
