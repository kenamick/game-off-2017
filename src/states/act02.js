// act01.js - level 2  implementation

import Renderer from './renderer';
import { GamePlay, TileMapConsts} from './gameplay';
import { FoeP1, FoeK1 } from '../entities';

class Act2 extends GamePlay {

  create() {
    super.create();

    this.createLevel('act2');
    this.arrangeLayers();
    this.attachHud();

    this.enemyAILevel = 2;
  }

  _addDoor(tx, ty) {
    const door = this.game.add.sprite(TileMapConsts.pos(tx), 
      TileMapConsts.pos(ty), 'atlas_sprites', 'door');
    this.addSpriteToLayer(door, true);

    // TODO: add sfx
  }

  _addEnemy(tx, ty, offsetX = 0, offsetY = 0) {
    this.spawnEnemy(TileMapConsts.ACTORS.K1, 
      TileMapConsts.pos(tx) + offsetX, 
      TileMapConsts.pos(ty) + offsetY, 
      this.enemyAILevel);
  }

  update() {
    /**
     * Hotpoint #1
     * Open bar door and spawn enemies
     */
    if (!this.hotpoints.hotpoint1.active && 
      this.player.sprite.x > this.hotpoints.hotpoint1.x) {
      this.hotpoints.hotpoint1.active = true;
      // door opens
      this._addDoor(3, 1);
      // spawn enemies
      this._addEnemy(3, 1);
      this._addEnemy(3, 1, -5, 1);
      this._addEnemy(3, 1, 4, 2);
    }

    // do collisions checks, etc. after player & NPC movements
    super.update();
  }

}

export { Act2 };