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

    let loadingBar = this.game.add.sprite(this.game.world.centerX / 2, this.game.world.centerY, 'loadingBar');
    loadingBar.center = this.world.centerX;
    loadingBar.scale.setTo(0.5);
    this.game.load.setPreloadSprite(loadingBar);

    // load levels
    this.game.load.tilemap('act1', 
      require('file-loader!../assets/levels/act1.json'), null,
      Phaser.Tilemap.TILED_JSON);
    this.game.load.image('gd-tiles', require('../assets/levels/gd-tileset.png'));

    // load sprites atlas
    this.load.atlas('atlas_sprites',
      require('../assets/sprites/sprites.png'),
      require('file-loader!../assets/sprites/sprites.json'),
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
