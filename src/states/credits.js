// credits.js
// Show game credits

import Renderer from './renderer';
import Globals from '../globals';
import Controls from '../controls';

class Credits extends Renderer {

  create() {
    super.create();

    const creditsTitle = this.game.add.bitmapText(this.game.world.centerX, 24, Globals.bitmapFont, 'CREDITS', 24);
    creditsTitle.anchor.setTo(0.5);

    this.game.add.bitmapText(5, 50, Globals.bitmapFont, 'Producer:', 10);
    this.game.add.bitmapText(10, 65, Globals.bitmapFont, 'Petar', 12);

    this.game.add.bitmapText(5, 85, Globals.bitmapFont, 'Audio Designer:', 10);
    this.game.add.bitmapText(10, 100, Globals.bitmapFont, 'LampEight', 12);

    this.game.add.bitmapText(
      this.game.world.width / 2 - 5, 50,
      Globals.bitmapFont, 'Visuals:', 10);
    this.game.add.bitmapText(
      this.game.world.width / 2, 65,
      Globals.bitmapFont, 'Petar, PsyBack', 12);

    this.game.add.bitmapText(
      this.game.world.width / 2 - 5, 85,
      Globals.bitmapFont, 'Programmers:', 10);
    this.game.add.bitmapText(
      this.game.world.width / 2, 100,
      Globals.bitmapFont, `Alexey, Carlos, \nPetar`, 12);

    // leave text
    const leaveText = this.game.add.bitmapText(this.game.world.centerX, 155, Globals.bitmapFont, '(Press Punch key to continue)', 8);
    leaveText.anchor.setTo(0.5);
    leaveText.alpha = 0;

    this.game.add.tween(leaveText).to({ alpha: 1   }, 1000, Phaser.Easing.Linear.None, true, 0, -1, true);

    this.controls = new Controls(this.game, true);
  }

  update() {
    super.update();

    if(this.controls.punch || this.controls.jump || this.controls.kick)
      this.state.start('mainmenu');
  }

}

export { Credits };
