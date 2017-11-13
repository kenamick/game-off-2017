// lifebar.js - ui for showing character health

class HealthBar {

  constructor(game, x, y) {
    this.game = game;
    this._health = 20;
    this._spriteGroup = null;
    this._spriteBorder = null;
    this._createHealthBar(x, y);
  }

  _createHealthBar(x, y) {
    const width = 1;
    const height = 4;

    const healthBarSprite = new Phaser.Graphics(this.game);
    healthBarSprite.beginFill(Phaser.Color.hexToRGB('#ffffff'),  1)
                 .drawRect(0, 0, width, height)
                 .endFill();

    const healthBarSpriteTexture = healthBarSprite.generateTexture();
    this._spriteGroup = this.game.add.group();
    this._spriteGroup.createMultiple(this._health, healthBarSpriteTexture, 0, true);

    this._spriteGroup.align(this._health, 1, 2, 1);
    this._spriteGroup.x = x;
    this._spriteGroup.y = y;
    this._spriteGroup.fixedToCamera = true;
    this._spriteGroup.cameraOffset.setTo(x, y);

    const testing = new Phaser.Graphics(this.game);
    testing.lineStyle(1, Phaser.Color.hexToRGB('#ffffff'),  1)
                 .drawRect(0, 0, this._health * width * 2 + 1, height + 1)
                 .endFill();
    const test = testing.generateTexture();
    this.t = this.game.add.sprite(x - 1, y - 1, test);
    this.t.fixedToCamera = true;
    this.game.world.bringToTop(this.t);

  }

  update() {
    this.game.world.bringToTop(this.t);
    this.game.world.bringToTop(this._spriteGroup);
  }

}

export default HealthBar;
