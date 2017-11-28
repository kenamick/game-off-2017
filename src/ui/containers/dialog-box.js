// dialog-box.js - Container for showing player stats

// import Avatar from '../components/avatar';
import Controls from '../../controls';
import Globals from '../../globals';

const DialogBoxConsts = {
  LETTER_DELAY: 75, // ms
  LINE_DELAY: 200, // ms
  DIALOG_DELAY: 300, // ms
};

class DialogBox {

  constructor(game, dialog) {
    this.game = game;
    this._dialog = dialog;

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
    const spanwidth = this.game.add.tween(this._boxSprite.scale).to({ x: 1 }, 500, Phaser.Easing.Linear.None, true, 500);
    spanwidth.onComplete.add(this.showMessage, this);
    game.add.tween(this._boxSprite.scale).to({ y: 1 }, 500, Phaser.Easing.Linear.None, true).chain(spanwidth);

    boxSprite.destroy();

    // start this dialog box as active
    this.active = true;
    this._currentDialog = 0;
  }

  destroy() {
    this._boxSprite.destroy();
    this.bitmapText.destroy();
  }

  showMessage() {
    // create wrapping
    // 1/4 of the box will be for the avatar
    // the other 3/4 will be for text
    const wrapwidth = this._boxSprite.width / 4;

    // TODO: add avatar here

    this._currentLine = 0;
    this._currentLetter = 0;
    this.bitmapText = this.game.add.bitmapText(wrapwidth, this._boxSprite.top + 5, Globals.bitmapFont, '', 12);
    this.bitmapText.maxWidth = wrapwidth * 3;

    this.nextDialog();

    // add controls
    this.controls = new Controls(this.game, true);

  }

  nextDialog() {
    if(this._currentDialog >= this._dialog.length) {
      this.active = false;
      return;
    }

    // get current dialog
    const dialog = this._dialog[this._currentDialog];

    // reset text from start
    this._currentLine = 0;

    // update avatar
    // TODO: update avatar

    this._text = dialog.text;
    this.nextLine();
  }

  nextLine() {
    if(this._currentLine >= this._text.length) {
      this._currentDialog++;
      this.game.time.events.add(DialogBoxConsts.DIALOG_DELAY, this.nextDialog, this);
      this.game.time.events.start();
      return;
    }

    const line = this._text[this._currentLine];
    this._currentLetter = 0;

    this.game.time.events.repeat(DialogBoxConsts.LETTER_DELAY, line.length, this.writeLine, this, line);
    this.game.time.events.start();
  }

  writeLine(line) {
    this.bitmapText.text = this.bitmapText.text + line[this._currentLetter];
    this._currentLetter++;
  }

  update() {
    if(this.controls != null && (this.controls.punch || this.controls.jump)) {
      // stop current writing
      this.game.time.events.destroy();

      // reset text to empty
      this.bitmapText.text = '';

      // go to next line with a little delay
      this._currentLine++;
      this.game.time.events.add(DialogBoxConsts.LINE_DELAY, this.nextLine, this);
      this.game.time.events.start();
    }
  }

}

export default DialogBox;
