// game-over.js - Player died, end game.

import Globals from '../globals';
import Controls from '../controls';
import Audio from '../audio';
import Renderer from './renderer';

class GameOver extends Renderer {

  create() {
    super.create();

    this.controls = new Controls(this.game, true);
    this.isOverOver = false;

    // play sfx
    this.audio = new Audio(this.game);
    this.audio.stop();
    this.audio.play(this.audio.sfx.gameover);

    const screenCenter = this.game.world.centerX;
    const ANIM_SPEED = 2500;
    const FONT_SIZE = 24;

    const textLeft = this.game.add.bitmapText(screenCenter - FONT_SIZE * 6, 
      FONT_SIZE * 1.5, Globals.bitmapFont, 'GAME', FONT_SIZE);
    textLeft.anchor.setTo(0.5);
    textLeft.alpha = 0.2;

    const textRight = this.game.add.bitmapText(screenCenter + FONT_SIZE * 6,
      FONT_SIZE * 1.5, Globals.bitmapFont, 'OVER', FONT_SIZE);
    textRight.anchor.setTo(0.5);
    textRight.alpha = 0.2;

    // smash letters fx
    const tween1 = this.game.add.tween(textLeft).to({ 
      x: screenCenter - FONT_SIZE * 2, alpha: 1 }, 1000, 
      Phaser.Easing.Linear.None, true, 0, 0, false);
    const tween2 = this.game.add.tween(textRight).to({ 
      x: screenCenter + FONT_SIZE * 2, alpha: 1 }, 1000, 
      Phaser.Easing.Linear.None, true, 0, 0, false);

    tween2.onComplete.add(() => {
      this.isOverOver = true;

      // 'you failed' text
      const failedText = this.game.add.bitmapText(this.game.world.centerX, 
        FONT_SIZE * 4, Globals.bitmapFont, 'You failed!', 12);
      failedText.anchor.setTo(0.5);
      failedText.alpha = 0;

      this.game.add.tween(failedText).to({ alpha: 1 }, 1000, 
        Phaser.Easing.Linear.None, true, 0, 0, false);

      // leave text
      const leaveText = this.game.add.bitmapText(this.game.world.centerX, 155, Globals.bitmapFont, '(Press Punch key to continue)', 8);
      leaveText.anchor.setTo(0.5);
      leaveText.alpha = 0;

      this.game.add.tween(leaveText).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, -1, true);
    });
  }

  update() {
    super.update();

    if ((this.controls.punch || this.controls.jump) && this.isOverOver) {
      this.state.start('mainmenu');
    }
  }

}

export { GameOver };
