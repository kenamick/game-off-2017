// act05.js - level 5 'Finale' implementation

import Renderer from './renderer';
import { GamePlay, TileMapConsts } from './gameplay';

const DIFFICULTY_LEVEL = 3;

class Act5 extends GamePlay {

  create() {
    super.create(DIFFICULTY_LEVEL);

    this.createLevel('act5');
    this.arrangeLayers();
    this.attachHud();

    this.gloria.standAngry();

    // reset state
    this.isGoHand = false;
    this.hotpointsDone = 0;
    this.hotpoints.hotpoint1.active = false;
    this.hotpoints.hotpoint2.active = false;
    this.hotpoints.hotpoint3.active = false;

    // hit the juke box
    this.jukebox(this.audio.musics.act3);
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
      // spawn enemies
      // TODO
    }

    /**
     * All bad guys dead => get the exit open
     */
    if (!this.isGoHand && super.isEnemiesDead() && this.hotpointsDone === 3) {
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
