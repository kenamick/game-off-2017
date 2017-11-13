// textdraw.js - text drawing routines and fx

import Globals from '../globals';

class Signals {

  constructor(game) {
    this.game = game;
  }

  /**
   * Displays a blinking hand at the given x,y location
   */
  hand(x, y, orientation = 'down') {
    const hand = this.game.add.sprite(x, y, 'atlas_sprites', 'hand');
    hand.alpha = 1;
    // hand.scale.x = -0.9;
    // hand.scale.y = -0.9;

    switch (orientation) {
      case 'down':
        hand.scale.y = -hand.scale.y;
      break;
      // more ...?
    }

    const toY = hand.y + 15;

    const tween = this.game.add.tween(hand).to({ alpha: .25, y: toY }, 
      500, Phaser.Easing.Linear.None , true, 0, -1, true);
  }

}

export default Signals;