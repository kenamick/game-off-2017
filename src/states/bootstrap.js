// bootstrap.js 
// Init Phaser, screen and physics.

import Renderer from './renderer';

class Bootstrap extends Renderer {

  constructor(game) {
    super(game);
  }

  create() {
    // enables fps counting
    this.time.advancedTiming = true;
    
    // enables keyboard input
    this.cursors = this.input.keyboard.createCursorKeys();

    // enables simple physics engine
    this.physics.startSystem(Phaser.Physics.ARCADE);
  }

  init() {
    super.initOnce();
  }

  update() {
    this.state.start('preload');
  }

}

export { Bootstrap };