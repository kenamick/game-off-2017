// hud.js - Container for showing player stats

import HealthBar from '../components/health-bar';
import GoHand from '../components/go-hand';

class Hud {

  constructor(game, audio, sprite) {
    this.game = game;
    this.audio = audio;

    const options = {
        x: 10,
        y: 10,
        fixedToCamera: true
    };
    this._healthbar = new HealthBar(game, sprite, options);
  }

  showThisWay() {
    this.hand = new GoHand(this.game, this.audio);
  }

  hideThisWay() {
    if (this.hand) {
      this.hand.sprite.destroy();
    }
  }

  update() {
    this._healthbar.update();
  }

}

export default Hud;
