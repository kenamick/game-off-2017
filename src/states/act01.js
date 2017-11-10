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

    this.createLevel('act1', 20, 5);

    this.player = new Hero(this.game);
    this.player.spawn(80, 164);

    this.frontGroup.add(this.player.sprite);

    this.game.world.bringToTop(this.behindGroup);
    this.game.world.bringToTop(this.frontGroup);
  }

  update() {
    this.player.update();

    super.update();
  }

}

export { Act1 };