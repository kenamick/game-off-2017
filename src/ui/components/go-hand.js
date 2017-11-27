// go-hand.js - show "This way" hand
import Globals from '../../globals';
import SpecialFx from '../../specialfx';

class GoHand {

  constructor(game) {
    this.hand = new SpecialFx(game).signals.hand(game.width - 25, 15, 'right');
    this.hand.fixedToCamera = true;

    // play sfx
    game.time.events.loop(800, () => {
      if (game.audio) {
        game.audio.play(game.audio.sfx.thisway);
      }
    });
  }

  get sprite() {
    return this.hand;
  }

}

export default GoHand;
