// options.js 
// Show and edit game options

import Renderer from './renderer';
import Globals from '../globals';
import Controls from '../controls';

class Options extends Renderer {

  create() {
    super.create();

    this.controls = new Controls(this.game, true);

    // state title
    const controlsTitle = this.game.add.bitmapText(this.game.world.centerX, 24, Globals.bitmapFont, 'CONTROLS', 24);
    controlsTitle.anchor.setTo(0.5);

    // add movement instructions
    const upArrow = this.game.add.image(25, 50, 'arrow');
    upArrow.anchor.setTo(0.5);
    upArrow.scale.setTo(0.035);
    
    const rightArrow = this.game.add.image(40, 65, 'arrow');
    rightArrow.anchor.setTo(0.5);
    rightArrow.angle = 90;
    rightArrow.scale.setTo(0.035);
    
    const downArrow = this.game.add.image(25, 80, 'arrow');
    downArrow.anchor.setTo(0.5);
    downArrow.angle = 180;
    downArrow.scale.setTo(0.035);
    
    const leftArrow = this.game.add.image(10, 65, 'arrow');
    leftArrow.anchor.setTo(0.5);
    leftArrow.angle = -90;
    leftArrow.scale.setTo(0.035);

    if (this.game.input.gamepad.pad1.connected) {
      const gamePad = this.game.add.bitmapText(this.game.world.width / 3 - 20, 50, Globals.bitmapFont, 'GAMEPAD DETECTED', 12);
      const arrowLegend = this.game.add.bitmapText(this.game.world.width / 3 - 20, 70, Globals.bitmapFont, 'MOVEMENT', 12);

      // add hit jump instructions
      const hitKey = this.game.add.bitmapText(6, 105, Globals.bitmapFont, 'X / 1', 10);
      hitKey.tint = 0x000000;
      const kitKeyLegend = this.game.add.bitmapText(this.game.world.width / 3, 105, Globals.bitmapFont, 'PUNCH', 12);

      const jumpKey = this.game.add.bitmapText(6, 130, Globals.bitmapFont, 'A / 2', 10);
      jumpKey.tint = 0x000000;
      const jumpKeyLegend = this.game.add.bitmapText(this.game.world.width / 3, 130, Globals.bitmapFont, 'KICK', 12);

    } else {
      const arrowLegend = this.game.add.bitmapText(this.game.world.width / 3, 60, Globals.bitmapFont, 'MOVEMENT', 12);

      // add hit jump instructions
      const hitKey = this.game.add.bitmapText(6, 105, Globals.bitmapFont, 'H / O / ENTER', 10);
      hitKey.tint = 0x000000;
      const kitKeyLegend = this.game.add.bitmapText(this.game.world.width / 2, 105, Globals.bitmapFont, 'PUNCH', 12);

      const jumpKey = this.game.add.bitmapText(6, 130, Globals.bitmapFont, 'J / P / BACKSP', 10);
      jumpKey.tint = 0x000000;
      const jumpKeyLegend = this.game.add.bitmapText(this.game.world.width / 2, 130, Globals.bitmapFont, 'KICK', 12);
    }

    // leave text
    const leaveText = this.game.add.bitmapText(this.game.world.centerX, 155, 
      Globals.bitmapFont, '(Press Punch to continue)', 8);
    leaveText.anchor.setTo(0.5);
    leaveText.alpha = 0;

    this.game.add.tween(leaveText).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, -1, true);
  }

  update() {
    super.update();

    if(this.controls.punch || this.controls.jump || this.controls.kick) {
      this.state.start('mainmenu');
    }
  }

}

export { Options };
