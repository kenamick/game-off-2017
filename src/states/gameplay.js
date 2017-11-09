// gameplay.js 
// Common game levels routines, mechanics, entities, etc.

import Renderer from './renderer';

class GamePlay extends Renderer {

  create() {
    this.game.stage.backgroundColor = '#000';
    
    // Debug
    this.enableFps();
  }

  update() {
    super.update();
  }

}

export default GamePlay;