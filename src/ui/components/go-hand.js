// go-hand.js - show "This way" hand
import Globals from '../../globals';
import SpecialFx from '../../specialfx';

class GoHand {

  constructor(game) {
    this._sprite = new SpecialFx(game).signals.hand(game.width - 25, 15, 'right');
    this._sprite.fixedToCamera = true;

    // play sfx
    game.time.events.loop(800, () => {
      if (game.audio) {
        game.audio.play(game.audio.sfx.thisway);
      }
    });
  }

  get sprite() {
    return this._sprite;
  }

  faceLeft() {
    if (this._sprite.scale.y > 0) {
      this._sprite.scale.y = -this._sprite.scale.y;
    }
  }

  faceRight() {
    if (this._sprite.scale.y < 0) {
      this._sprite.scale.y = -this._sprite.scale.y;
    }
  }

}

export default GoHand;
