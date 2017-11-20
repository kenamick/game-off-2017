// act05.js - level 5 'Finale' implementation

import Renderer from './renderer';
import { GamePlay, TileMapConsts } from './gameplay';

class Act5 extends GamePlay {

  create() {
    super.create();

    this.createLevel('act5');
    this.arrangeLayers();
    this.attachHud();

    this.isGoHand = false;
    
    // edge of the screen
    this.nextLevelOffset = 24 * TileMapConsts.TILE_SIZE + TileMapConsts.TILE_SIZE / 2;
  }

  update() {
    /**
     * All enemies dead => go to Act #2
     */
    // if (super.isEnemiesDead()) {
    //   if (!this.isGoHand) {
    //     this.isGoHand = true;
    //     this.playerHud.showThisWay();
    //   }
    //   if (this.player.sprite.x > this.nextLevelOffset) {
    //     //this.state.start('act2');
    //   }
    // }
    
    // do collisions checks, etc. after player & NPC movements
    super.update();
  }

}

export { Act5 };