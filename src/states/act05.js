// act05.js - level 5 'Finale' implementation

import Renderer from './renderer';
import { GamePlay, TileMapConsts } from './gameplay';

const DIFFICULTY_LEVEL = 3;

class Act5 extends GamePlay {

  create() {
    super.create(DIFFICULTY_LEVEL);

    this.createLevel('act5');
    this.adjustLayers();
    this.adjustPlayer();
    this.attachHud();

    this.gloria.standAngry();

    // reset state
    this.isGoHand = false;
    this.hotpointsDone = 0;
    this.hotpoints.hotpoint0.active = false;
    this.hotpoints.hotpoint1.active = false;
    this.hotpoints.hotpoint2.active = false;
    this.hotpoints.hotpoint3.active = false;
    this.hotpoints.hotpoint4.active = false;

    // hit the juke box
    this.jukebox(this.audio.musics.act3);
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
     * Spawn enemies from behind
     */
    if (!this.hotpoints.hotpoint0.active && 
      this.player.sprite.x > this.hotpoints.hotpoint0.x) {
      this.hotpoints.hotpoint0.active = true;
      this.hotpointsDone += 1;
      // spawn enemies
      this._addEnemy(TileMapConsts.ACTORS.K1, 0, 3, -24);
      this._addEnemy(TileMapConsts.ACTORS.K1, 0, 5);
      //this._addEnemy(TileMapConsts.ACTORS.K2, 1, 5);
    }

    /**
     * Hotpoint #4
     * Spawn enemy from behind
     */
    if (!this.hotpoints.hotpoint4.active && 
      this.player.sprite.x > this.hotpoints.hotpoint4.x) {
      this.hotpoints.hotpoint4.active = true;
      this.hotpointsDone += 1;
      // spawn enemies
      this._addEnemy(TileMapConsts.ACTORS.P2, 5, 3, -4);
      this._addEnemy(TileMapConsts.ACTORS.P1, 3, 5);
    }

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
      this._addEnemy(TileMapConsts.ACTORS.K2, 23, 2);
      this._addEnemy(TileMapConsts.ACTORS.P1, 23, 2, -5, 1);
      this._addEnemy(TileMapConsts.ACTORS.K1, 23, 2, 4, 2);
      // behind
      this._addEnemy(TileMapConsts.ACTORS.P2, 19, 5);
      this._addEnemy(TileMapConsts.ACTORS.K1, 18, 2);
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
      this.game.time.events.add(5000, () => {
        this._addEnemy(TileMapConsts.ACTORS.K1, 23, 2, -4, 4);
        this._addEnemy(TileMapConsts.ACTORS.K1, 23, 2, 3, 3);
      });
      this.game.time.events.add(4500, () => {
        this._addEnemy(TileMapConsts.ACTORS.P1, 24, 5);
      });
      // behind
      this._addEnemy(TileMapConsts.ACTORS.K2, 24, 5);
    }

    /**
     * Hotpoint #3
     * Boss Fight
     */
    if (!this.hotpoints.hotpoint3.active && 
      this.player.sprite.x > this.hotpoints.hotpoint3.x) {
      this.hotpoints.hotpoint3.active = true;
      this.hotpointsDone += 1;
      // change music
      this.audio.fadeOut(this.audio.musics.act3);
      this.audio.play(this.audio.musics.boss);
      // start barking Dido
      this.dido.stand();

      // spawn enemies every 20 sec. for 5 minutes
      this.spawnTimer = this.game.time.events.repeat(20 * 1000, 15, () => {
        if (!this.bossSpawn1) {
          this.bossSpawn1 = 1;
          this.bossSpawn2 = 1;
        }
        // spawn 1 big enemy every 3rd time
        if (this.bossSpawn1 % 3 === 0) {
          if (this.bossSpawn2 % 2 === 0) {
            this._addEnemy(TileMapConsts.ACTORS.P2, 23, 2);
          } else {
            this._addEnemy(TileMapConsts.ACTORS.K2, 23, 2);
          }
          this.bossSpawn2 += 1;
        } else if (this.bossSpawn1 % 2 === 0) {
          this._addEnemy(TileMapConsts.ACTORS.P1, 27, 5);
          this._addEnemy(TileMapConsts.ACTORS.P1, 23, 2);
        } else {
          this._addEnemy(TileMapConsts.ACTORS.K1, 27, 5);
          this._addEnemy(TileMapConsts.ACTORS.K1, 23, 2);
        }
        this.bossSpawn1 += 1;
      });
    }

    // seize spawning enemies
    if (this.arkian.dead && this.spawnTimer) {
      this.game.time.events.remove(this.spawnTimer);
      this.spawnTimer = null;
    }

    /**
     * All bad guys dead => get the exit open
     */
    if (!this.isGoHand && super.isEnemiesDead() && this.hotpointsDone === 5) {
        this.isGoHand = true;

        // This whole think below is held by ducktape
        // But yeah, ...just ship it! ;)

        const part1 = () => {
          // move dog to boss and get naughty
          this.dido.moveTo(this.arkian, () => this.dido.naughty());
          // dog goes back
          this.game.time.events.add(6000, part2);
        };
        const part2 = () => {
          this.audio.play(this.audio.musics.maintheme);

          this.dido.moveTo(this.player, () => this.dido.stand());
          this.game.time.events.add(4000, part3);
        };
        const part3 = () => {
          this.player.faceRight();
          this.gloria.stand();
          this.gloria.faceRight();

          this.specialFx.screenFade(() => {
            this.state.start('credits');
          });
        };

        // stop world
        this.audio.fadeOut(this.audio.musics.boss);
        this.player.controlsEnabled = false;

        this.game.time.events.add(3000, () => {

          this.specialFx.screenFade(() => {
            // align actors
            this.frontGroup.remove(this.arkian.sprite);
            this.frontGroup.remove(this.dido.sprite);
            this.game.world.add(this.arkian.sprite);
            this.game.world.add(this.dido.sprite);
            this.dido.sprite.x -= 12;
            this.game.world.bringToTop(this.dido.sprite);

            this.arkian.sprite.x = 27 * TileMapConsts.TILE_SIZE;
            this.arkian.sprite.y = 3.5 * TileMapConsts.TILE_SIZE;

            this.player.sprite.x = this.gloria.sprite.x;
            this.player.sprite.y = this.gloria.sprite.y + TileMapConsts.TILE_SIZE * 0.5;
            this.player.faceLeft();
            this.player.stand();

            this.gloria.stand();

            //this.game.camera.resetFX();
            this.specialFx.screenFadeIn(part1);
          });
        });
    }

    this.dido.update();
    this.gloria.update();
    
    // do collisions checks, etc. after player & NPC movements
    super.update();
  }

}

export { Act5 };
