// act01.js - level 1 implementation

import Renderer from './renderer';
import DialogBox from '../ui/containers/dialog-box';
import { GamePlay, TileMapConsts } from './gameplay';

const DIFFICULTY_LEVEL = 1;

class Act1 extends GamePlay {

  create() {
    super.create(DIFFICULTY_LEVEL);

    this.createLevel('act1');
    this.adjustLayers();
    this.attachHud();

    // reset state
    this.isGoHand = false;
    this.hotpointsDone = 0;
    this.hotpoints.hotpoint0.active = false;
    this.hotpoints.hotpoint1.active = false;
    this.hotpoints.hotpoint2.active = false;
    this.hotpoints.hotpoint3.active = false;

    // edge of the screen
    this.nextLevelOffset = 24 * TileMapConsts.TILE_SIZE + TileMapConsts.TILE_SIZE / 2;

    // hit the juke box
    this.jukebox(this.audio.musics.maintheme);

    const dialog = this.game.cache.getJSON('dialog1');

    this.dialogBox = new DialogBox(this.game, dialog);
  }

  _addEnemy(type, tx, ty, offsetX = 0, offsetY = 0) {
    const halfSize = TileMapConsts.TILE_SIZE * 0.5;
    this.spawnEnemy(type, 
      TileMapConsts.pos(tx) - halfSize + offsetX, 
      TileMapConsts.pos(ty) + halfSize + offsetY, 
      this.level, 
      // engage from far away
      {
        ai: { ENGAGE_RANGE: 1000 * 1000 }
      });
  }

  update() {
   /**
     * Hotpoint #0
     * Spawn behind player
     */
    if (!this.hotpoints.hotpoint0.active && 
      this.player.sprite.x > this.hotpoints.hotpoint0.x) {
      this.hotpoints.hotpoint0.active = true;
      this.hotpointsDone += 1;
      // spawn enemies
      this._addEnemy(TileMapConsts.ACTORS.P1, 9, 5);
    }

    /**
     * Hotpoint #1
     * Spawn behind player
     */
    if (!this.hotpoints.hotpoint1.active && 
      this.player.sprite.x > this.hotpoints.hotpoint1.x) {
      this.hotpoints.hotpoint1.active = true;
      this.hotpointsDone += 1;
      // spawn enemies
      this._addEnemy(TileMapConsts.ACTORS.P1, 12, 5);
      this._addEnemy(TileMapConsts.ACTORS.P1, 10, 2);
    }

    /**
     * Hotpoint #2
     * Spawn behind player
     */
    if (!this.hotpoints.hotpoint2.active && 
      this.player.sprite.x > this.hotpoints.hotpoint2.x) {
      this.hotpoints.hotpoint2.active = true;
      this.hotpointsDone += 1;
      // spawn enemies
      this._addEnemy(TileMapConsts.ACTORS.P1, 14, 2);
      this._addEnemy(TileMapConsts.ACTORS.P1, 14, 4);
    }

    /**
     * Hotpoint #3
     * Spawn behind player
     */
    if (!this.hotpoints.hotpoint3.active && 
      this.player.sprite.x > this.hotpoints.hotpoint3.x) {
      this.hotpoints.hotpoint3.active = true;
      this.hotpointsDone += 1;
      // spawn enemies
      this._addEnemy(TileMapConsts.ACTORS.P1, 20, 2);
      this._addEnemy(TileMapConsts.ACTORS.P1, 22, 5);
      this._addEnemy(TileMapConsts.ACTORS.P1, 26, 3);
    }

    /**
     * All enemies dead => go to Act #2
     */
    if (super.isEnemiesDead() && this.hotpointsDone === 4) {
      if (!this.isGoHand) {
        this.isGoHand = true;
        this.playerHud.showThisWay();
      }
      if (this.player.sprite.x > this.nextLevelOffset) {
        this.goLevel('act2');
      }
    }

    // do collisions checks, etc. after player & NPC movements
    super.update();
  }

}

export { Act1 };
