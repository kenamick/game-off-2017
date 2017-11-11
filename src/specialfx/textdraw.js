// textdraw.js - text drawing routines and fx

import Globals from '../globals';

const TextConsts = {
  FADE_OUT: 2000, // ms
  FADE_UP_STEP: 50 // pixels
};

class TextDraw {

  constructor(game) {
    this.game = game;
    this.font = {
      font: '8px ' + Globals.gameFont,
      fill: '#ffffff'
    };
  }

  _createText(x, y, text) {
    const msg = this.game.add.text(x, y, '', this.font);
    msg.anchor.set(.5, .5);
    msg.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    msg.setText(text);

    this.game.world.bringToTop(msg);

    return msg;
  }

  fading(x, y, text) {
    const msg = this._createText(x, y, text);
    msg.alpha = 1;

    const tween = this.game.add.tween(msg).to({ alpha: 0 },
      TextConsts.FADE_OUT, Phaser.Easing.Quartic.In, true, 0, 0, false);

    // if (callback) {
    //   tween.onComplete.add(callback);
    // }
  }

  fadingUp(x, y, text) {
    const msg = this._createText(x, y, text);
    msg.alpha = 1;
    const toY = msg.y - TextConsts.FADE_UP_STEP;

    const tween = this.game.add.tween(msg).to({ alpha: 0, y: toY }, 
      TextConsts.FADE_OUT, Phaser.Easing.Cubic.Out, true, 0, 0, false);
  }

}

export default TextDraw;