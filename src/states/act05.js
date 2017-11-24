// act05.js - level 5 'Finale' implementation

import Renderer from './renderer';
import { GamePlay, TileMapConsts } from './gameplay';

class Act5 extends GamePlay {

  create() {
    super.create();

    this.createLevel('act5');
    this.arrangeLayers();
    this.attachHud();

    this.enemyAILevel = 2;
    
    // reset state
    this.isGoHand = false;
    this.hotpointsDone = 0;
    this.hotpoints.hotpoint1.active = false;
    this.hotpoints.hotpoint2.active = false;
  }

  _addEnemy(type, tx, ty, offsetX = 0, offsetY = 0) {
    const halfSize = TileMapConsts.TILE_SIZE * 0.5;
    this.spawnEnemy(type, 
      TileMapConsts.pos(tx) - halfSize + offsetX, 
      TileMapConsts.pos(ty) + halfSize + offsetY, 
      this.enemyAILevel);
  }

  update() {
    /**
     * Hotpoint #1
     * Open door and spawn enemies
     */
    if (!this.hotpoints.hotpoint1.active && 
      this.player.sprite.x > this.hotpoints.hotpoint1.x) {
      this.hotpoints.hotpoint1.active = true;
      this.hotpointsDone += 1;
      // door opens
      this.addDoor(22, 2);
      // spawn enemies
      this._addEnemy(TileMapConsts.ACTORS.K1, 23, 2);
      this._addEnemy(TileMapConsts.ACTORS.P1, 23, 2, -5, 1);
      this._addEnemy(TileMapConsts.ACTORS.K1, 23, 2, 4, 2);
      this._addEnemy(TileMapConsts.ACTORS.K1, 23, 2, 4, 2);
    }

    /**
     * Hotpoint #2
     * Spawn even more enemies from door #1
     */
    if (!this.hotpoints.hotpoint2.active && 
      this.player.sprite.x > this.hotpoints.hotpoint2.x) {
      this.hotpoints.hotpoint2.active = true;
      this.hotpointsDone += 1;
      // spawn enemies
      this._addEnemy(TileMapConsts.ACTORS.P1, 23, 2, -2);
      this._addEnemy(TileMapConsts.ACTORS.P1, 23, 2, -4, 4);
      this._addEnemy(TileMapConsts.ACTORS.K1, 23, 2, 3, 3);
    }

    /**
     * All bad guys dead => get the exit open
     */
    if (super.isEnemiesDead() && this.hotpointsDone === 2) {
      // TODO: End Game
    }
    
    // do collisions checks, etc. after player & NPC movements
    super.update();
  }

}

export { Act5 };
