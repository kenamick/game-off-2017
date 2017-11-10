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
    this.player.spawn(50, 144);

    this.frontGroup.add(this.player.sprite);

    this.game.world.bringToTop(this.behindGroup);
    this.game.world.bringToTop(this.frontGroup);
  }

  update() {
    super.update();

    // z-index sorting
    // TODO: make this work for all sprites and not only the player?
    if (this.player.update()) {
      if (this.player.sprite.bottom < TileMapConsts.FG_Y && 
        this.behindGroup.children.indexOf(this.player.sprite) < 0) {
         
         this.behindGroup.add(this.player.sprite);
         this.frontGroup.remove(this.player.sprite);
      } else if (this.player.sprite.bottom > TileMapConsts.FG_Y && 
          this.frontGroup.children.indexOf(this.player.sprite) < 0)  {
        this.behindGroup.remove(this.player.sprite);
        this.frontGroup.add(this.player.sprite);
      }
    }

  }

}

export { Act1 };