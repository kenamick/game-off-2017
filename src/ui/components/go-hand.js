// go-hand.js - show "This way" hand
import Globals from '../../globals';
import SpecialFx from '../../specialfx';

class GoHand {

  constructor(game, audio) {
    this.audio = audio;

    this.hand = new SpecialFx(game, audio).signals.hand(
      game.width - 25, 15, 'right');
    this.hand.fixedToCamera = true;

    // play sfx
    game.time.events.loop(800, () => {
      if (this.audio) {
        this.audio.play(this.audio.sfx.go);
      }
    });
  }

  get sprite() {
    return this.hand;
  }

}

export default GoHand;
