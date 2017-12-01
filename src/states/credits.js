// credits.js
// Show game credits

import Renderer from './renderer';
import Globals from '../globals';
import Controls from '../controls';

class Credits extends Renderer {

  create() {
    super.create();

    const creditsTitle = this.addText(
      'CREDITS',
      this.game.world.centerX, 24, 24
    );

    creditsTitle.anchor.setTo(0.5);

    const columnsTop = 45;

    const column1Left = 5;
    const column1Padding = column1Left + 5;

    const column2Left = this.game.world.width / 2 - 5;
    const column2Padding = this.game.world.width / 2;

    this.addText('Producer:', column1Left, columnsTop);
    this.addText('Petar Petrov', column1Padding, columnsTop + 15);

    this.addText('Audio Designer:', column1Left, columnsTop + 45);
    this.addText('Will Tonna', column1Padding, columnsTop + 60);

    this.addText('Visuals:', column2Left, columnsTop);
    this.addText(
      'Petar Petrov\nPavel Antonov',
      column2Padding, columnsTop + 15);

    this.addText('Programmers:', column2Left, columnsTop + 45);
    this.addText(
      `Alexey Vishnyakov\nCarlos Braga\nPetar Petrov`,
      column2Padding, columnsTop + 60);

    // leave text
    const leaveText = this.game.add.bitmapText(this.game.world.centerX, 155, 
      Globals.bitmapFont, '(Press Punch to continue)', 8);
    leaveText.anchor.setTo(0.5);
    leaveText.alpha = 0;

    this.game.add.tween(leaveText).to({ alpha: 1   }, 1000, Phaser.Easing.Linear.None, true, 0, -1, true);

    this.controls = new Controls(this.game, true);
  }

  addText(
    text='text',
    x=0,
    y=0,
    fontSize=10,
    font=Globals.bitmapFont,
  ) {
    return this.game.add.bitmapText(x, y, font, text, fontSize);
  }

  update() {
    super.update();

    if(this.controls.punch || this.controls.jump || this.controls.kick)
      this.state.start('mainmenu');
  }

}

export { Credits };
