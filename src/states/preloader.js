// preloader.js
// Loads all required assets - gfx & sfx

import Globals from '../globals';
import Renderer from './renderer';

const PreloaderConsts = {
  SPLASH_FADE: 2000, // ms
}

class Preloader extends Renderer {

  constructor() {
    super();
  }

  preload() {
    this._loadingBar = this.game.add.sprite(this.game.world.centerX / 2, 
      this.game.world.centerY, 'loadingBar');
    this._loadingBar.centerX = this.world.centerX;
    this._loadingBar.scale.setTo(0.5);
    this.game.load.setPreloadSprite(this._loadingBar);

    // load bitmap font
    // TODO: change bitmap font name to a simpler and more reasonable one
    // after choosing the one we'll officially pick
    this.game.load.bitmapFont('04b03', require('../assets/fonts/04b03/04b03.png'), 
      require('file-loader!../assets/fonts/04b03/04b03.xml'));
    this.game.load.bitmapFont('8bit', 
      require('../assets/fonts/8bitoperator-jve/8bitoperator-jve.png'), 
      require('file-loader!../assets/fonts/8bitoperator-jve/8bitoperator-jve.xml'));
    this.game.load.bitmapFont('standard', 
      require('../assets/fonts/standard-0753/standard-0753.png'), 
      require('file-loader!../assets/fonts/standard-0753/standard-0753.xml'));

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

  create() {
    // remove loading bar from screen
    this._loadingBar.kill();

    // set background to the game average color (optional)
    this.game.stage.backgroundColor = Globals.palette.bricks2.hex; //'#4c583d';

    // create splash screen
    let splashText = this.game.add.bitmapText(this.game.world.centerX,
      this.game.world.centerY, 'standard', 'KICKPUNCH', 32);
    splashText.anchor.setTo(0.5);
    splashText.alpha = 0;

    // add some cool effects
    let tween = this.game.add.tween(splashText).to({ alpha: 1 },
      PreloaderConsts.SPLASH_FADE, Phaser.Easing.Linear.None, true, 0, 0, true);
    tween.onComplete.add(function(splashText, tween) {
      // TODO: change this to menu in production
      this.state.start('mainmenu');
    }, this);
  }

}

export { Preloader };
