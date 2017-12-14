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
      x: sprite.centerX,
      y: sprite.top,
      width: 50,
      height: 8,
      bar: {
        color: Globals.palette.sky.hex, // '#ffffff',
        background: Globals.palette.background.hex
      },
      fixedToCamera: false,
      ...options
    };
    this._alive = true;
    this._createHealthBar();
    this.visible = options.visible || false;
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
    this._sprite.fixedToCamera = this._options.fixedToCamera;
    this.game.world.bringToTop(this._sprite);

    healthBarBackgroundSprite.destroy();
    healthBarSprite.destroy();
  }

  set visible(visible) {
    this._backgroundSprite.visible = visible;
    this._sprite.visible = visible;
  }

  update() {
    if(!this._alive)
      return false;

    if(this._health != this._objectSprite.health) {
      // move this to a function maybe?
      this._health = this._objectSprite.health;
      this.game.add.tween(this._sprite).to({ width: this._options.width * this._objectSprite.health / this._objectSprite.maxHealth },
        200, Phaser.Easing.Linear.None, true);
    }

    if(!this._options.fixedToCamera) {
      this._backgroundSprite.centerX = this._objectSprite.centerX;
      this._backgroundSprite.bottom = this._objectSprite.top;
      this._sprite.x = this._backgroundSprite.x + 1;
      this._sprite.centerY = this._backgroundSprite.centerY;

      if(this._health <= 0) {
        this._alive = false;
        const tween = this.game.add.tween(this._backgroundSprite).to({ alpha: 0 }, 
        80, Phaser.Easing.Linear.None , true, 0, 7, true);
        tween.onComplete.add(() => {
          this._backgroundSprite.kill();
          this._sprite.kill()
        });
      }
    }

    this.game.world.bringToTop(this._backgroundSprite);
    this.game.world.bringToTop(this._sprite);
  }

}

export default HealthBar;
