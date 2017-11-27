// specialfx.js - factory for fading fonts, particles, dynamic animations, etc.

import TextDraw from './textdraw';
import Signals from './signals';

class SpecialFx {

  constructor(game) {
    this.game = game;
    this._textdraw = new TextDraw(game);
    this._signals = new Signals(game);
  }

  screenFade(callback, time = 1500) {
    this.game.camera.fade(0x000000, time);
    this.game.camera.onFadeComplete.removeAll();
    this.game.camera.onFadeComplete.add(callback);
  }

  screenFadeIn(callback, time = 1500) {
    this.game.camera.flash(0xffffff, time, true);
    this.game.camera.onFlashComplete.removeAll();
    this.game.camera.onFlashComplete.add(callback);
  }

  get textdraw() {
    return this._textdraw;
  }

  get signals() {
    return this._signals;
  }

}

export default SpecialFx;
