// options-audio.js
// Game audio options screen.

import Audio from '../audio';
import Globals from '../globals';
import Controls from '../controls';

import Renderer from './renderer';

const AudioMenuConsts = {
  options: [
    'SOUND ON',
    'MUSIC ON',
    '< BACK'
  ],
};

class OptionsAudio extends Renderer {

  preload() {
    Audio.loadMusic(this.game, 'boss');
  }

  create() {
    super.create();

    const screenCenter = this.game.world.centerX;

    const menuTitle = this.game.add.bitmapText(screenCenter, 30,
      Globals.bitmapFont, 'KickPunch', 30);
    menuTitle.anchor.setTo(0.5);

    // create a text for each option
    this.selectedOption = 0;
    this.optionTexts = [];
    let ypos = this.game.world.height / AudioMenuConsts.options.length + 24;
    for (const [i, option] of AudioMenuConsts.options.entries()) {
      const text = this.game.add.bitmapText(screenCenter, ypos + 24 * i, Globals.bitmapFont, option, 12);
      text.anchor.setTo(0.5);
      this.optionTexts.push(text);
    }
    
    // stop all sfx in menu
    this.audio = new Audio(this.game);
    this.audio.stop();

    this.controls = new Controls(this.game, true);

    // default options
    this.updateOptions();
  }

  update() {
    super.update();

    for (const [i, option] of this.optionTexts.entries()) {
      if (i == this.selectedOption)
        option.tint = 0x000000;
      else
        option.tint = 0xffffff;
    }

    this.handleInput();
  }

  handleInput() {
    if (this.controls.up) {
      this.selectedOption--;
      this.audio.play(this.audio.sfx.hero.punch, 2);
    }
    else if (this.controls.down) {
      this.selectedOption++;
      this.audio.play(this.audio.sfx.hero.punch, 1);
    }
    else if (this.controls.punch || this.controls.jump || this.controls.kick)
      this.chooseOption();

    if (this.selectedOption < 0)
      this.selectedOption = 0;
    if (this.selectedOption >= AudioMenuConsts.options.length)
      this.selectedOption = AudioMenuConsts.options.length - 1;
  }

  chooseOption() {
    if (this.selectedOption === 0) {
      if (!this.audio.soundsOn) {
        this.audio.soundsOn = true;
        // test snd
        this.audio.play(this.audio.sfx.hero.punch, 2);
      } else {
        this.audio.soundsOn = false;
      }
    }

    if (this.selectedOption === 1) {
      if (!this.audio.musicOn) {
        this.audio.musicOn = true;
        // test play
        this.audio.musics.boss.volume = 1;
        this.audio.play(this.audio.musics.boss);
        this.audio.fadeOut(this.audio.musics.boss);
      } else {
        this.audio.musicOn = false;
      }
    }

    if (this.selectedOption === 2) {
      this.audio.play(this.audio.sfx.hero.punch, 2);
      this.state.start('mainmenu');
    }

    this.updateOptions();
  }

  updateOptions() {
    if (this.audio.soundsOn) {
      this.optionTexts[0].setText('SOUND ON');
    } else {
      this.optionTexts[0].setText('SOUND OFF');
    }

    if (this.audio.musicOn) {
      this.optionTexts[1].setText('MUSIC ON');
    } else {
      this.optionTexts[1].setText('MUSIC OFF');
    }
  }

}

export { OptionsAudio };
