// act01.js 
// Level 1 gameplay implementation

import Renderer from './renderer';
import GamePlay from './gameplay';
import { Hero } from '../entities/main-character';

class Act1 extends GamePlay {

  create() {
    super.create();

    this.player = new Hero(this.game);
    this.player.spawn(50, 50);
  }

  update() {
    super.update();

    this.player.update();
  }

}

export { Act1 };