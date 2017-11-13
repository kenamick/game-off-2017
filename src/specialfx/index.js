// specialfx.js - factory for fading fonts, particles, dynamic animations, etc.

import TextDraw from './textdraw';
import Signals from './signals';

class SpecialFx {

  constructor(game) {
    this.game = game;

    this._textdraw = new TextDraw(game);
    this._signals = new Signals(game);
  }

  get textdraw() {
    return this._textdraw;
  }

  get signals() {
    return this._signals;
  }

}

export default SpecialFx;