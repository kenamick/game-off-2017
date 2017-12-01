// intro.js - game intro implementation
import Globals from '../globals';
import Renderer from './renderer';
import DialogBox from '../ui/containers/dialog-box';
import { GamePlay, TileMapConsts } from './gameplay';

const DIFFICULTY_LEVEL = 0;

class Intro extends GamePlay {

  create() {
    super.create(DIFFICULTY_LEVEL);

    this.createLevel('intro');
    this.adjustLayers();
    this.attachHud();

    // skip dalogs
    this.skipKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);

    // reset state
    this.isGoHand = false;

    // hit the juke box
    this.jukebox(this.audio.musics.maintheme, false);

    // init scene
    this.player.relax();
    for (const actor of this.enemies) {
      actor.sprite.animations.stop();
    }

    this._dialogEvents = this._dialogChange.bind(this);

    const dialog = this.game.cache.getJSON('dialog1');
    this.dialogBox = new DialogBox(this.game, dialog, this._dialogEvents);
  }

  _dialogChange(dialog) {
    switch (dialog.id) {
      case 1:
        this.game.camera.follow(null);
      break;

      case 5:
        this.dido.naughty();
      break;

      case 8:
        if (!this._scriptThug) {
          this._scriptThug = true;

          this.game.camera.follow(null);
          this.game.camera.focusOn(this.enemies[0].sprite);
          
          // reset dialog box
          this.dialogBox.destroy();
          this.dialogBox = new DialogBox(this.game, 
            this.game.cache.getJSON('dialog1'), 
            this._dialogEvents, 8);
        }
      break;

      case 9:
        if (!this._scriptBrian1) {
          this._scriptBrian1 = true;

          this.game.camera.follow(null);
          this.game.camera.focusOn(this.dido.sprite);
            
          // reset dialog box
          this.dialogBox.destroy();
          this.dialogBox = new DialogBox(this.game, 
            this.game.cache.getJSON('dialog1'), 
            this._dialogEvents, 9);
        }
      break;

      case 10:
        if (!this._scriptArkian) {
          this._scriptArkian = true;

          this.game.camera.follow(null);

          this.arkian.faceRight();
          this.arkian.sprite.x = 96;
          this.arkian.sprite.y = 120;
          this.game.camera.focusOn(this.arkian.sprite);

          this.enemies[0].faceRight();
          this.enemies[0].sprite.x = 66;
          this.enemies[0].sprite.y = 140;
          this.enemies[1].faceRight();
          this.enemies[1].sprite.x = 86;
          this.enemies[1].sprite.y = 110;
          this.enemies[2].faceRight();
          this.enemies[2].sprite.x = 126;
          this.enemies[2].sprite.y = 115;

          this.player.faceLeft();

          // reset dialog box
          this.dialogBox.destroy();
          this.dialogBox = new DialogBox(this.game, 
            this.game.cache.getJSON('dialog1'), 
            this._dialogEvents, 10);
        }
      break;

      case 11:
        if (!this._scriptGloria1) {
          this._scriptGloria1 = true;

          this.game.camera.focusOn(this.gloria.sprite);
            
          // reset dialog box
          this.dialogBox.destroy();
          this.dialogBox = new DialogBox(this.game, 
            this.game.cache.getJSON('dialog1'), 
            this._dialogEvents, 11);
        }
      break;

      case 12:
        if (!this._scriptBrian2) {
          this._scriptBrian2 = true;

          this.game.camera.focusOn(this.player.sprite);
            
          // reset dialog box
          this.dialogBox.destroy();
          this.dialogBox = new DialogBox(this.game, 
            this.game.cache.getJSON('dialog1'), 
            this._dialogEvents, 12);
        }
      break;

      case 13:
        if (!this._scriptArkian2) {
          this._scriptArkian2 = true;

          this.game.camera.focusOn(this.arkian.sprite);
            
          // reset dialog box
          this.dialogBox.destroy();
          this.dialogBox = new DialogBox(this.game, 
            this.game.cache.getJSON('dialog1'), 
            this._dialogEvents, 13);
        }
      break;

    }
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
    if (this.skipKey.justPressed()) {
      this.goLevel('act1');
    }

    if (!this.dialogBox) {
      this.goLevel('act1');
    }

    // do collisions checks, etc. after player & NPC movements
    super.update();
  }

}

export { Intro };
