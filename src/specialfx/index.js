// specialfx.js - factory for fading fonts, particles, dynamic animations, etc.

import TextDraw from './textdraw';

class SpecialFx {

  constructor(game) {
    this.game = game;

    this._textdraw = new TextDraw(game);
  }

  get textdraw() {
    return this._textdraw;
  }

}

export default SpecialFx;