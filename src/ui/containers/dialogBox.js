// dialogBox.js - Container for showing player stats

// import Avatar from '../components/avatar';
import Globals from '../../globals';

class DialogBox {

  constructor(game, text) {
    this.game = game;

    const boxSprite = this.game.add.graphics();
    boxSprite.beginFill(Phaser.Color.hexToRGB(Globals.palette.bricks2.hex),  1)
             .lineStyle(3, Phaser.Color.hexToRGB(Globals.palette.bricks1.hex), 1)
             .drawRect(0, 0, game.width - 3, game.height / 3)
             .endFill();

    const boxSpriteTexture = boxSprite.generateTexture();
    this._boxSprite = this.game.add.sprite(0, game.height + 3, boxSpriteTexture);
    this._boxSprite.fixedToCamera = true;
    this._boxSprite.anchor.setTo(0, 1);
    this._boxSprite.scale.setTo(0.01, 0);

    // add some fancy effects
    game.add.tween(this._boxSprite.scale).to({ y: 1 }, 500, Phaser.Easing.Linear.None, true).chain(this.game.add.tween(this._boxSprite.scale).to({ x: 1 }, 500, Phaser.Easing.Linear.None, true, 500));

    this.game.world.bringToTop(this._boxSprite);

    boxSprite.destroy();
  }

  update() {
    this._healthbar.update();
  }

}

export default DialogBox;
