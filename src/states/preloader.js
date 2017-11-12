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

    // load bitmap font
    // TODO: change bitmap font name to a simpler and more reasonable one
    // after choosing the one we'll officially pick
    this.game.load.bitmapFont('04b03', require('../assets/fonts/04b03/04b03.png'), require('file-loader!../assets/fonts/04b03/04b03.xml'));
    this.game.load.bitmapFont('8bit', require('../assets/fonts/8bitoperator-jve/8bitoperator-jve.png'), require('file-loader!../assets/fonts/8bitoperator-jve/8bitoperator-jve.xml'));
    this.game.load.bitmapFont('standard', require('../assets/fonts/standard-0753/standard-0753.png'), require('file-loader!../assets/fonts/standard-0753/standard-0753.xml'));

    // load levels
    this.game.load.image('gd-tiles', require('../assets/levels/gd-tileset.png'));

    this.game.load.tilemap('act1', 
      require('file-loader!../assets/levels/act1.json'), null,
      Phaser.Tilemap.TILED_JSON);
    this.game.load.tilemap('act2', 
      require('file-loader!../assets/levels/act2.json'), null,
      Phaser.Tilemap.TILED_JSON);

    // load sprites atlas
    this.load.atlas('atlas_sprites',
      require('../assets/sprites/sprites.png'),
      require('file-loader!../assets/sprites/sprites.json'),
      Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);

  }

  update() {
    if (this._ready) {
      // TODO: change this to menu in production
      this.state.start('act1');
    }
  }

  onLoadComplete() {
    this._ready = true;
  }

}

export { Preloader };
