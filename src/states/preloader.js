// preloader.js
// Loads all required assets - gfx & sfx

import Renderer from './renderer';

class Preloader extends Renderer {

  constructor() {
    super();
    this._ready = false;
  }

  preload() {
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);

    // load sprites atlas
    this.load.atlas('atlas_sprites',
      require('../assets/graphicriver-fassous/characters-sprites/characters-sprites.png'),
      require('file-loader!../assets/graphicriver-fassous/characters-sprites/characters-sprites.json'),
      Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);

  }

  update() {
    if (this._ready) {
      // TODO: change this to menu in production
      this.state.start('play');
    }
  }

  onLoadComplete() {
    this._ready = true;
  }

}

export { Preloader };
