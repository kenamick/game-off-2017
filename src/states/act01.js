// act01.js - level 1 implementation

import Renderer from './renderer';
import DialogBox from '../ui/containers/dialog-box';
import { GamePlay, TileMapConsts } from './gameplay';

const DIFFICULTY_LEVEL = 1;

class Act1 extends GamePlay {

  create() {
    super.create(DIFFICULTY_LEVEL);

    this.createLevel('act1');
    this.arrangeLayers();
    this.attachHud();

    this.isGoHand = false;

    // edge of the screen
    this.nextLevelOffset = 24 * TileMapConsts.TILE_SIZE + TileMapConsts.TILE_SIZE / 2;

    // hit the juke box
    this.jukebox(this.audio.musics.maintheme);

    const dialog = this.game.cache.getJSON('dialog1');

    this.dialogBox = new DialogBox(this.game, dialog);
  }

  update() {
    /**
     * All enemies dead => go to Act #2
     */
    if (super.isEnemiesDead()) {
      if (!this.isGoHand) {
        this.isGoHand = true;
        this.playerHud.showThisWay();
      }
      if (this.player.sprite.x > this.nextLevelOffset) {
        this.specialFx.screenFade(
          () => this.state.start('loading', true, false, 'act2'));
      }
    }

    // do collisions checks, etc. after player & NPC movements
    super.update();
  }

}

export { Act1 };
