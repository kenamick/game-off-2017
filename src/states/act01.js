// act01.js - level 1 implementation

import Renderer from './renderer';
import { GamePlay} from './gameplay';

class Act1 extends GamePlay {

  create() {
    super.create();

    this.createLevel('act1');
    this.arrangeLayers();
    this.attachHud();
  }

  update() {
    // TODO
    // go to level 2
    if (this.player.sprite.x > 24 * 48 + 24) {
      this.state.start('act2');
    }
    
    // do collisions checks, etc. after player & NPC movements
    super.update();
  }

}

export { Act1 };