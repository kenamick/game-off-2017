// credits.js
// Show game credits

import Renderer from './renderer';
import Controls from '../controls';

class Credits extends Renderer {

  create() {
    super.create();

    const creditsTitle = this.game.add.bitmapText(this.game.world.centerX, 24, 'standard', 'CREDITS', 24);
    creditsTitle.anchor.setTo(0.5);

    this.game.add.bitmapText(10, 50, 'standard', 'Artists: ', 12);
    this.game.add.bitmapText(this.game.world.width / 3, 65, 'standard', 'Petarov', 10);

    this.game.add.bitmapText(10, 85, 'standard', 'Audio Designer: ', 12);
    this.game.add.bitmapText(this.game.world.width / 3, 100, 'standard', 'LampEight', 10);

    this.game.add.bitmapText(10, 120, 'standard', 'Programmers: ', 12);
    this.game.add.bitmapText(this.game.world.width / 3, 135, 'standard', 'Alexey, Carlos, Petarov', 10);

    // leave text
    const leaveText = this.game.add.bitmapText(this.game.world.centerX, 155, 'standard', '(Press Enter or Space to leave)', 8);
    leaveText.anchor.setTo(0.5);
    leaveText.alpha = 0;

    this.game.add.tween(leaveText).to({ alpha: 1   }, 1000, Phaser.Easing.Linear.None, true, 0, -1, true);

    this.controls = new Controls(this.game, true);
  }

  update() {
    if(this.controls.punch || this.controls.jump)
      this.state.start('mainmenu');
  }

}

export { Credits };
