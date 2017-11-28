// dialogBox.js - Container for showing player stats

// import Avatar from '../components/avatar';
import Globals from '../../globals';

const DialogBoxConsts = {
  LETTER_DELAY: 100, // ms
  LINE_DELAY: 200, // ms
};

class DialogBox {

  constructor(game, avatar, text) {
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
    this._currentLine = 0;
    this._currentLetter = 0;
    this._text = this.game.add.bitmapText(wrapwidth, this._boxSprite.top + 5, Globals.bitmapFont, '', 12);
    this._text.maxWidth = wrapwidth * 3;

    this.nextLine();
  }

  nextLine() {
    if(this._currenLine == this.text.length)
      return;

    const line = this.text[this._currentLine];

    this._currentLetter = 0;

    this.game.time.events.repeat(DialogBoxConsts.LETTER_DELAY, line.length, this.writeLine, this, line);
  }

  writeLine(line) {
    this._text.text = this._text.text + line[this._currentLetter];
    this._currentLetter++;

    if(this._currentLetter == line.length) {
      this._text.text += '\n';
      this.game.time.events.add(DialogBoxConsts.LINE_DELAY, this.nextLine, this);
    }
  }

  update() {
  }

}

export default DialogBox;
