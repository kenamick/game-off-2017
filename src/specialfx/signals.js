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
      case 'right':
        hand.anchor.setTo(0.5);
        hand.angle += 90;
      break;
      // more ...?
    }

    const toY = hand.y + 15;

    const tween = this.game.add.tween(hand).to({ alpha: .25, y: toY }, 
      800, Phaser.Easing.Linear.None , true, 0, -1, true);

    // tween.onLoop.add(() => {
    //   console.log('text')
    //   if (this.audio) {
    //     this.audio.play(this.audio.sfx.go);
    //   }
    // });

    return hand;
  }

}

export default Signals;
