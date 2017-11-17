// bootstrap.js 
// Init Phaser, screen and physics.

import Renderer from './renderer';

class Bootstrap extends Renderer {

  constructor(game) {
    super(game);
  }

  preload() {
    // load loading bar
    this.game.load.image('loadingBar', require('../assets/images/loading.png'));
  }

  create() {
    // enables fps counting
    this.time.advancedTiming = true;

    // enables keyboard input
    this.cursors = this.input.keyboard.createCursorKeys();

    // enables simple physics engine
    this.physics.startSystem(Phaser.Physics.ARCADE);

    // fire up the game pad
    this.input.gamepad.start()
  }

  init() {
    super.initOnce();
  }

  update() {
    this.state.start('preload');
  }

}

export { Bootstrap };
