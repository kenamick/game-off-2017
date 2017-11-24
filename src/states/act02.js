// act01.js - level 2  implementation

import Renderer from './renderer';
import { GamePlay, TileMapConsts} from './gameplay';

const DIFFICULTY_LEVEL = 2;

class Act2 extends GamePlay {

  create() {
    super.create(DIFFICULTY_LEVEL);

    this.createLevel('act2');
    this.arrangeLayers();
    this.attachHud();

    // reset state
    this.isGoHand = false;
    this.hotpointsDone = 0;
    this.hotpoints.hotpoint1.active = false;
    this.hotpoints.hotpoint2.active = false;
    this.hotpoints.hotpoint3.active = false;
    this.hotpoints.hotpoint5.active = false;
    this.hotpoints.hotpoint6.active = false;
  }

  _addEnemy(type, tx, ty, offsetX = 0, offsetY = 0) {
    const halfSize = TileMapConsts.TILE_SIZE * 0.5;
    this.spawnEnemy(type, 
      TileMapConsts.pos(tx) - halfSize + offsetX, 
      TileMapConsts.pos(ty) + halfSize + offsetY, 
      this.level);
  }

  update() {
    /**
     * Hotpoint #1
     * Open bar door and spawn enemies
     */
    if (!this.hotpoints.hotpoint1.active && 
      this.player.sprite.x > this.hotpoints.hotpoint1.x) {
      this.hotpoints.hotpoint1.active = true;
      this.hotpointsDone += 1;
      // door opens
      this.addDoor(3, 1);
      // spawn enemies
      this._addEnemy(TileMapConsts.ACTORS.K1, 4, 1);
      this._addEnemy(TileMapConsts.ACTORS.K1, 4, 1, -5, 1);
      this._addEnemy(TileMapConsts.ACTORS.K1, 4, 1, 4, 2);
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
      this._addEnemy(TileMapConsts.ACTORS.K1, 4, 1, -2);
      this._addEnemy(TileMapConsts.ACTORS.K1, 4, 1, -4, 4);
      this._addEnemy(TileMapConsts.ACTORS.P1, 4, 1, 3, 3);
    }

    /**
     * Hotpoint #3
     */
    if (!this.hotpoints.hotpoint3.active && 
      this.player.sprite.x > this.hotpoints.hotpoint3.x) {
      this.hotpoints.hotpoint3.active = true;
      this.hotpointsDone += 1;
      // door opens
      this.addDoor(7, 1);
      // spawn enemies
      this._addEnemy(TileMapConsts.ACTORS.P1, 8, 1, -1);
      this._addEnemy(TileMapConsts.ACTORS.K1, 8, 1, 4, 8);
      this._addEnemy(TileMapConsts.ACTORS.P1, 8, 1, 5, 2);
    }

    /**
     * Hotpoint #5
     */
    if (!this.hotpoints.hotpoint5.active && 
      this.player.sprite.x > this.hotpoints.hotpoint5.x) {
      this.hotpoints.hotpoint5.active = true;
      this.hotpointsDone += 1;
      // door opens
      this.addDoor(16, 1);
      // spawn enemies
      this._addEnemy(TileMapConsts.ACTORS.P1, 17, 1, 5, 2);
      this._addEnemy(TileMapConsts.ACTORS.K1, 17, 1, -3, 4);
    }

    /**
     * Hotpoint #6
     */
    if (!this.hotpoints.hotpoint6.active && 
      this.player.sprite.x > this.hotpoints.hotpoint6.x) {
      this.hotpoints.hotpoint6.active = true;
      this.hotpointsDone += 1;
      // door opens
      this.addDoor(24, 1);
      // spawn enemies
      this._addEnemy(TileMapConsts.ACTORS.K1, 25, 1, 7, 1);
      this._addEnemy(TileMapConsts.ACTORS.K1, 25, 1, -4, 2);
      this._addEnemy(TileMapConsts.ACTORS.K1, 25, 1, 1, 1);
    }

    /**
     * All bad guys dead => get the exit open
     */
    if (super.isEnemiesDead() && this.hotpointsDone === 5) {
      if (!this.isGoHand) {
        this.playerHud.showThisWay();
        // fixe a go hand to exit door
        this.isGoHand = true;
        this.specialFx.signals.hand(TileMapConsts.pos(27) + 12,
          TileMapConsts.pos(1), 'down');
        // door opens
        this.addDoor(27, 1);
      } else if (this.isGoHand && this.player.sprite.x > TileMapConsts.pos(27)) {
        // hide signal hand, if pass the exit door
        this.playerHud.hideThisWay();
      }

      // warp dat dude
      if (this.isGoHand && 
        this.player.sprite.bottom < TileMapConsts.WALK_CONSTRAINT_Y + 6 && 
        this.player.sprite.x > TileMapConsts.pos(27) + 14 &&
        this.player.sprite.x < TileMapConsts.pos(28) - 14) {
        this.state.start('act5');
      }
    }

    // do collisions checks, etc. after player & NPC movements
    super.update();
  }

}

export { Act2 };
