// textdraw.js - text drawing routines and fx

import Globals from '../globals';

const TextConsts = {
  DEFAULT_SIZE: 8,
  FADE_OUT: 2000, // ms
  FADE_UP_STEP: 50 // pixels
};

class TextDraw {

  constructor(game) {
    this.game = game;
  }

  _createText(x, y, text, size = TextConsts.DEFAULT_SIZE) {
    const msg = this.game.add.bitmapText(x, y, Globals.bitmapFont, text,
      size);
    msg.anchor.set(0.5);
    msg.setText(text);

    this.game.world.bringToTop(msg);

    return msg;
  }

  fading(x, y, text, fadeOutTime = TextConsts.FADE_OUT) {
    const msg = this._createText(x, y, text);
    msg.alpha = 1;

    const tween = this.game.add.tween(msg).to({ alpha: 0 },
      fadeOutTime, Phaser.Easing.Cubic.Out, true, 0, 0, false);

    tween.onComplete.add(() => msg.destroy());
    // if (callback) {
    //   tween.onComplete.add(callback);
    // }
  }

  fadingUp(x, y, text, fadeOutTime = TextConsts.FADE_OUT) {
    const msg = this._createText(x, y, text);
    msg.alpha = 1;
    const toY = msg.y - TextConsts.FADE_UP_STEP;

    const tween = this.game.add.tween(msg).to({ alpha: 0, y: toY },
      fadeOutTime, Phaser.Easing.Cubic.Out, true, 0, 0, false);

    tween.onComplete.add(() => msg.destroy());
  }

}

export default TextDraw;
