// act01.js - level 2  implementation

import Renderer from './renderer';
import { 
  GamePlay, 
  GamePlayConsts,
  TileMapConsts
} from './gameplay';
import { Hero } from '../entities';

class Act2 extends GamePlay {

  create() {
    super.create();

    this.createLevel('act2');

    this.player = new Hero(this.game);
    this.player.spawn(50, 144);

    this.addSpriteToLayer(this.player.sprite, true);

    this.arrangeLayers();
  }

  update() {
    this.player.update();
    this.updatePlayerCollisions(this.player.sprite);
    
    // do collisions checks, etc. after player & NPC movements
    super.update();
  }

}

export { Act2 };