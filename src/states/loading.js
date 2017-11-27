// loading.js
// Loads acts' specific assets - gfx & sfx

import Audio from '../audio';
import Controls from '../controls';
import Globals from '../globals';
import Renderer from './renderer';

const LoadingConsts = {
  SPLASH_FADE: 1500, // ms
  LOAD_TIME: 5,
};

class Loading extends Renderer {

  constructor(game) {
    super(game);
  }

  init(nextState) {
    this.nextState = nextState;

    // stop all audios
    const audio = new Audio(this.game);

    if (nextState !== 'act1') {
      audio.stop();
    }

    // play transition tune
    audio.play(audio.musics.fanfare);
  }

  preload() {
    this.resetWorld();
    // default background color
    this.game.stage.backgroundColor = Globals.palette.menuBackground.hex;

    this.game.load.onLoadComplete.add(this.loadComplete, this);

    // add a countdown for next state
    this.timer = this.game.time.create();
    this.timer.add(Phaser.Timer.SECOND * LoadingConsts.LOAD_TIME, this.changeState, this);

    // load audios
    let nextStateText = '';
    if(this.nextState == 'act1') {
      Audio.loadMusic(this.game, 'maintheme');
      nextStateText = 'ACT 1';
    }
    else if(this.nextState == 'act2') {
      Audio.loadMusic(this.game, 'act2');
      nextStateText = 'ACT 2';
    }
    else if(this.nextState == 'act5') {
      // XXX actually this is Act 5 - Finale
      Audio.loadMusic(this.game, 'act3');
      nextStateText = 'ACT 3';
    }

    // add text to screen
    const stateText = this.game.add.bitmapText(this.game.world.centerX, 
      this.game.world.centerY - 48, Globals.bitmapFont, nextStateText, 24);
    stateText.anchor.setTo(0.5);
    stateText.scale.setTo(0);
    this.game.add.tween(stateText.scale).to({ x: 1, y: 1 }, 500, Phaser.Easing.Linear.None, true);

    this.text = this.game.add.bitmapText(this.game.world.centerX, this.game.world.centerY + 8, Globals.bitmapFont, '', 12);
    this.text.anchor.setTo(0.5);

    this.timer.start();
  }

  update() {
    if(this.timer.running)
      this.text.text = 'LOADING...\n\t\t\t\t\t\t' + (LoadingConsts.LOAD_TIME - Math.round(this.timer.ms / 1000));
    else
      this.text.text = 'LOADED!';

    if(this.controls.punch || this.controls.jump)
      this.changeState();
  }

  loadComplete() {
    const skipText = this.game.add.bitmapText(this.game.world.width - 16, this.game.world.height - 16, Globals.bitmapFont, 'SKIP', 12);
    skipText.anchor.setTo(1);
    skipText.alpha = 0;

    this.game.add.tween(skipText).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, -1, true);

    this.controls = new Controls(this.game, true);
  }

  changeState() {
    this.timer.stop();
    this.state.start(this.nextState);
  }

}

export { Loading };
