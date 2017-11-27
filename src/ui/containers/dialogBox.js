// dialogBox.js - Container for showing player stats

// import Avatar from '../components/avatar';
import Globals from '../../globals';

class DialogBox {

  constructor(game, text) {
    this.game = game;
    this.avatar = null; // TODO: add avatar
    this.text = text;

    const boxSprite = this.game.add.graphics();
    boxSprite.beginFill(Phaser.Color.hexToRGB(Globals.palette.bricks2.hex),  1)
             .lineStyle(3, Phaser.Color.hexToRGB(Globals.palette.bricks1.hex), 1)
             .drawRect(0, 0, game.width - 3, game.height / 3)
             .endFill();

    const boxSpriteTexture = boxSprite.generateTexture();
    this._boxSprite = this.game.add.sprite(0, game.height + 3, boxSpriteTexture);
    this._boxSprite.fixedToCamera = true;
    this._boxSprite.anchor.setTo(0, 1);
    this._boxSprite.scale.setTo(0.02, 0);

    // add some fancy effects
    const spanwidth = this.game.add.tween(this._boxSprite.scale).to({ x: 1 }, 500, Phaser.Easing.Linear.None, true, 500)
    spanwidth.onComplete.add(this.showMessage, this);
    game.add.tween(this._boxSprite.scale).to({ y: 1 }, 500, Phaser.Easing.Linear.None, true).chain(spanwidth);

    boxSprite.destroy();
  }

  showMessage() {
    // create wrapping
    // 1/4 of the box will be for the avatar
    // the other 3/4 will be for text

    const wrapwidth = this._boxSprite.width / 4;
    
    // TODO: add avatar here
    this._text = this.game.add.bitmapText(wrapwidth, this._boxSprite.top + 5, Globals.bitmapFont, this.text, 12);
    this._text.maxWidth = wrapwidth * 3;

  }

  update() {
  }

}

export default DialogBox;
