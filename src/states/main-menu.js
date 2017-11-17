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
    const screenCenter = this.game.world.centerX;

    const menuTitle = this.game.add.bitmapText(screenCenter, 24, 'standard', 'MAIN MENU', 24);
    menuTitle.anchor.setTo(0.5);
    
    // create a text for each option
    this.selectedOption = 0;
    this.optionTexts = [];
    let ypos = this.game.world.height / MainMenuConsts.options.length + 24;
    for(const [i, option] of MainMenuConsts.options.entries()) {
      const text = this.game.add.bitmapText(screenCenter, ypos + 24 * i, 'standard', option, 12);
      text.anchor.setTo(0.5);
      this.optionTexts.push(text);
    }

    this.controls = new Controls(this.game, true);
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
      this.state.start('option');

    // start credits state
    if(this.selectedOption == 2)
      this.state.start('credits');
  }

}

export { MainMenu };
