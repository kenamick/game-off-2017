// act01.js 
// Level 1 gameplay implementation

import Renderer from './renderer';
import { 
  GamePlay, 
  GamePlayConsts,
  TileMapConsts
} from './gameplay';
import { Hero } from '../entities/main-character';

const Consts = {

};

class Act1 extends GamePlay {

  create() {
    super.create();

    this.createLevel('act1', 25, 5);

    this.player = new Hero(this.game);
    this.player.spawn(80, 164);

    this.frontGroup.add(this.player.sprite);

    this.arrangeLayers();
  }

  update() {
    this.player.update();
    
    // do collisions checks, etc. after player & NPC movements
    super.update();
  }

}

export { Act1 };