// gameplay.js 
// Game levels, mechanics, entities, etc.

import Renderer from './renderer';
import { Hero } from '../entities/main-character';

class GamePlay extends Renderer {

  create() {
    this.game.stage.backgroundColor = '#185d5b';
    
    //this.game.add.bitmapText(380, 150, 'USE THE ARROW KEYS TO MOVE', 'Bitmap Fonts', 48);

    this.player = new Hero(this.game);
    this.player.spawn(50, 50);
    
    // Debug
    this.enableFps();
  }

  update() {
    super.update();

    this.player.update();
  }

}

export { GamePlay };