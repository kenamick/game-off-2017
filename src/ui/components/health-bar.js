// healthbar.js - ui for showing character health

import Globals from '../../globals';

class HealthBar {

  constructor(game, sprite, options = null) {
    this.game = game;
    this._health = sprite.maxHealth;
    this._sprite = null;
    this._backgroundSprite = null;
    this._objectSprite = sprite;
    this._options = {
      x: sprite.left - 5,
      y: sprite.top - 5,
      width: 50,
      height: 8,
      bar: {
        color: Globals.palette.sky.hex, // '#ffffff',
        background: Globals.palette.background.hex
      },
      fixedToCamera: false,
      ...options
    };
    this._createHealthBar();
  }

  _createHealthBar() {
    const healthBarBackgroundSprite = this.game.add.graphics();
    healthBarBackgroundSprite.beginFill(Phaser.Color.hexToRGB(this._options.bar.background),  1)
                             .drawRect(0, 0, this._options.width + 2, this._options.height + 2)
                             .endFill();

    const healthBarBackgroundSpriteTexture = healthBarBackgroundSprite.generateTexture();
    this._backgroundSprite = this.game.add.sprite(this._options.x - 1, this._options.y - 1, healthBarBackgroundSpriteTexture);
    this._backgroundSprite.fixedToCamera = this._options.fixedToCamera;

    const healthBarSprite = this.game.add.graphics();
    healthBarSprite.beginFill(Phaser.Color.hexToRGB(this._options.bar.color),  1)
                   .drawRect(0, 0, this._options.width, this._options.height)
                   .endFill();

    const healthBarSpriteTexture = healthBarSprite.generateTexture();
    this._sprite = this.game.add.sprite(this._options.x, this._options.y, healthBarSpriteTexture);
    this._sprite.fixedToCamera = true;
    this.game.world.bringToTop(this._sprite);

    healthBarBackgroundSprite.destroy();
    healthBarSprite.destroy();
  }

  update() {
    if(this._health != this._objectSprite.health) {
      // move this to a function maybe?
      this._health = this._objectSprite.health;
      this.game.add.tween(this._sprite).to({ width: this._options.width * this._objectSprite.health / this._objectSprite.maxHealth },
        200, Phaser.Easing.Linear.None, true);
    }

    this.game.world.bringToTop(this._backgroundSprite);
    this.game.world.bringToTop(this._sprite);
  }

}

export default HealthBar;
