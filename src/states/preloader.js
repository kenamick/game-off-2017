// preloader.js
// Loads all required assets - gfx & sfx

import Globals from '../globals';
import Renderer from './renderer';

const PreloaderConsts = {
  SPLASH_FADE: 1500, // ms
}

class Preloader extends Renderer {

  constructor(game) {
    super(game);
  }

  preload() {
    this._loadingBar = this.game.add.sprite(this.game.world.centerX / 2, 
      this.game.world.centerY, 'loadingBar');
    this._loadingBar.centerX = this.world.centerX;
    this._loadingBar.scale.setTo(0.5);
    this.game.load.setPreloadSprite(this._loadingBar);

    // load bitmap font
    this.game.load.bitmapFont(Globals.bitmapFont, 
      require('../assets/fonts/standard-0753/standard-0753.png'), 
      require('file-loader!../assets/fonts/standard-0753/standard-0753.xml'));

    // load images
    this.game.load.image('arrow', require('../assets/images/arrow.png'));

    // load levels
    this.game.load.image('gd-tiles', require('../assets/levels/gd-tileset.png'));

    this.game.load.tilemap('act1',
      require('file-loader!../assets/levels/act1.json'), null,
      Phaser.Tilemap.TILED_JSON);
    this.game.load.tilemap('act2',
      require('file-loader!../assets/levels/act2.json'), null,
      Phaser.Tilemap.TILED_JSON);
    this.game.load.tilemap('act5',
      require('file-loader!../assets/levels/act5.json'), null,
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
    this.game.stage.backgroundColor = Globals.palette.menuBackground.hex;

    // create splash screen
    const splashText = this.game.add.bitmapText(this.game.world.centerX,
      this.game.world.centerY, Globals.bitmapFont, 'TEAM KICKPUNCH', 20);
    splashText.anchor.setTo(0.5);
    splashText.alpha = 0;

    // add some cool effects
    const tween = this.game.add.tween(splashText).to({ alpha: 1 },
      PreloaderConsts.SPLASH_FADE, Phaser.Easing.Linear.None, true, 0, 0, true);

    tween.onComplete.add((splashText, tween) => {
      const presentsText = this.game.add.bitmapText(this.game.world.centerX,
        this.game.world.centerY, Globals.bitmapFont, 'PRESENTS', 18);
        presentsText.anchor.setTo(0.5);
        presentsText.alpha = 0;

      const tween2 = this.game.add.tween(presentsText).to({ alpha: 1 },
        PreloaderConsts.SPLASH_FADE, Phaser.Easing.Linear.None, true, 0, 0, true);
        tween2.onComplete.add(() => {
        this.state.start('mainmenu');
      });
    }, this);
  }

}

export { Preloader };
