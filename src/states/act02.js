// act01.js - level 2  implementation

import Renderer from './renderer';
import { GamePlay} from './gameplay';

class Act2 extends GamePlay {

  create() {
    super.create();

    this.createLevel('act2');
    this.arrangeLayers();
    this.attachHud();
  }

  update() {
    // do collisions checks, etc. after player & NPC movements
    super.update();
  }

}

export { Act2 };