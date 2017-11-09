// gameplay.js 
// Common game levels routines, mechanics, entities, etc.

import Renderer from './renderer';

class GamePlay extends Renderer {

  create() {
    // default sky color
    this.game.stage.backgroundColor = '#c4cfa1';
    
    // Debug
    this.enableFps();
  }

  update() {
    super.update();
  }

}

export default GamePlay;