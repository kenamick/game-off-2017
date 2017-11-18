// go-hand.js - show "This way" hand

import Globals from '../../globals';
import SpecialFx from '../../specialfx';

class GoHand {

  constructor(game) {
    const specialFx = new SpecialFx(game);

    const hand = specialFx.signals.hand(game.width - 25, 15, 'right');
    hand.fixedToCamera = true;
    
    // TODO: add sfx tween
  }

  get sprite() {
    return hand;
  }

}

export default GoHand;