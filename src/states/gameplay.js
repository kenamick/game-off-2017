// gameplay.js 
// Common game levels routines, mechanics, entities, etc.

import Renderer from './renderer';

class GamePlay extends Renderer {

  create() {
    // default sky color
    this.game.stage.backgroundColor = '#c4cfa1';
    // this.game.stage.backgroundColor = '#4D533C'; @n3tC0de's
    
    // Debug
    this.enableFps();
  }

  update() {
    super.update();
  }

}

export default GamePlay;