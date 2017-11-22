// main-menu.js 
// Game main menu options screen.

import Globals from '../globals';
import Controls from '../controls';

import Renderer from './renderer';

const MainMenuConsts = {
  options: [
    'PLAY',
    'CONTROLS',
    'CREDITS',
  ],
};

class MainMenu extends Renderer {

  create() {
    super.create();

    const screenCenter = this.game.world.centerX;

    this.playIntro(screenCenter);
    
    // create a text for each option
    this.selectedOption = 0;
    this.optionTexts = [];
    let ypos = this.game.world.height / MainMenuConsts.options.length + 24;
    for(const [i, option] of MainMenuConsts.options.entries()) {
      const text = this.game.add.bitmapText(screenCenter, ypos + 24 * i, Globals.bitmapFont, option, 12);
      text.anchor.setTo(0.5);
      this.optionTexts.push(text);
    }

    this.controls = new Controls(this.game, true);
  }

  playIntro(screenCenter) {
    // TODO: add some cool fx when the real game name is set
    const menuTitle = this.game.add.bitmapText(screenCenter, 24, Globals.bitmapFont, 'GAME NAME', 24);
    menuTitle.anchor.setTo(0.5);
  }

  update() {
    for(const [i, option] of this.optionTexts.entries()) {
      if(i == this.selectedOption)
        option.tint = 0x000000;
      else
        option.tint = 0xffffff;
    }

    this.handleInput();
  }

  handleInput() {
    if(this.controls.up)
      this.selectedOption--;
    else if(this.controls.down)
      this.selectedOption++;
    else if(this.controls.punch || this.controls.jump)
      this.chooseOption();

    if(this.selectedOption < 0)
      this.selectedOption = 0;
    if(this.selectedOption >= MainMenuConsts.options.length)
      this.selectedOption = MainMenuConsts.options.length - 1;
  }

  chooseOption() {
    // start play state
    if(this.selectedOption == 0)
      this.state.start('act1');

    // start option state
    if(this.selectedOption == 1)
      this.state.start('options');

    // start credits state
    if(this.selectedOption == 2)
      this.state.start('credits');
  }

}

export { MainMenu };
