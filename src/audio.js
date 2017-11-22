// audio.js - handles all user input

import Globals from './globals';

class Audio {

  static loadSfx(game) {
    game.load.audio('hero-dive', require('file-loader!./assets/sfx/BrianDive.m4a'));
    game.load.audio('hero-jump', require('file-loader!./assets/sfx/BrianJump.m4a'));
    game.load.audio('hero-kick1', require('file-loader!./assets/sfx/BrianKick1.m4a'));
    game.load.audio('hero-kick2', require('file-loader!./assets/sfx/BrianKick2.m4a'));
    game.load.audio('hero-kick3', require('file-loader!./assets/sfx/BrianKick3.m4a'));
    game.load.audio('hero-punch1', require('file-loader!./assets/sfx/BrianPunch1.m4a'));
    game.load.audio('hero-punch2', require('file-loader!./assets/sfx/BrianPunch2.m4a'));
    game.load.audio('hero-punch3', require('file-loader!./assets/sfx/BrianPunch3.m4a'));
    game.load.audio('death1', require('file-loader!./assets/sfx/Death1.m4a'));
    game.load.audio('death2', require('file-loader!./assets/sfx/Death2.m4a'));
    game.load.audio('death3', require('file-loader!./assets/sfx/Death3.m4a'));
    game.load.audio('death4', require('file-loader!./assets/sfx/Death4.m4a'));
    game.load.audio('door1', require('file-loader!./assets/sfx/Door1.m4a'));
    game.load.audio('door2', require('file-loader!./assets/sfx/Door2.m4a'));
    game.load.audio('door3', require('file-loader!./assets/sfx/Door3.m4a'));
    game.load.audio('foodpickup', require('file-loader!./assets/sfx/FoodPickup.m4a'));
    game.load.audio('gameover', require('file-loader!./assets/sfx/GameOver.m4a'));
    game.load.audio('go', require('file-loader!./assets/sfx/Go.m4a'));
    game.load.audio('npcdespawn', require('file-loader!./assets/sfx/NPCDespawn.m4a'));
    game.load.audio('npc-hit1', require('file-loader!./assets/sfx/NPCHit1.m4a'));
    game.load.audio('npc-hit2', require('file-loader!./assets/sfx/NPCHit3.m4a'));
    game.load.audio('npc-hit3', require('file-loader!./assets/sfx/NPCHit2.m4a'));
    game.load.audio('breakglass1', require('file-loader!./assets/sfx/PropBreakGlass1.m4a'));
    game.load.audio('breakglass2', require('file-loader!./assets/sfx/PropBreakGlass2.m4a'));
    game.load.audio('breakglass3', require('file-loader!./assets/sfx/PropBreakGlass3.m4a'));
    game.load.audio('breakmetal1', require('file-loader!./assets/sfx/PropBreakMetal1.m4a'));
    game.load.audio('breakmetal2', require('file-loader!./assets/sfx/PropBreakMetal2.m4a'));
    game.load.audio('breakmetal3', require('file-loader!./assets/sfx/PropBreakMetal3.m4a'));
    game.load.audio('ready', require('file-loader!./assets/sfx/Ready.m4a'));
    game.load.audio('thisway', require('file-loader!./assets/sfx/ThisWayMix.m4a'));
  }

  static loadMusic(game, level) {
      const path = './assets/musics/';
      const musics = {
        level2: 'GO17-Act2_aac.m4a',
        level3: 'GO17-Act3_aac.m4a',
        boss: 'GO17-Boss_aac.m4a',
        maintheme: 'GO17-MainTheme_aac.m4a',
        fanfare: 'GO17-Fanfare_aac.m4a'
      };

      console.log('file-loader!' + path + musics[level]);
      game.load.sound(level, require('file-loader!' + path + musics[level]));
  }

  constructor(game) {
    this.game = game;

    // add all possible musics
    this.musics = {
        maintheme: game.add.sound('maintheme', 1, true)
    };

    // add all possible sfx
    this.sfx = {
      hero: {
        dive: game.add.audio('hero-dive'),
        kick: [
          game.add.audio('hero-kick1'),
          game.add.audio('hero-kick2'),
          game.add.audio('hero-kick3')
        ],
        jump: game.add.audio('hero-jump'),
        punch: [
          game.add.audio('hero-punch1'),
          game.add.audio('hero-punch2'),
          game.add.audio('hero-punch3')
        ],
      },
      death: [
        game.add.audio('death1'),
        game.add.audio('death2'),
        game.add.audio('death3'),
        game.add.audio('death4')
      ],
      door: [
        game.add.audio('door1'),
        game.add.audio('door2'),
        game.add.audio('door3')
      ],
      foodpickup: [
        game.add.audio('foodpickup')
      ],
      gameover: [
        game.add.audio('gameover')
      ],
      go: [
        game.add.audio('go')
      ],
      npcdespawn: [
        game.add.audio('npcdespawn')
      ],
      npc: {
        hit: [
          game.add.audio('npc-hit1'),
          game.add.audio('npc-hit2'),
          game.add.audio('npc-hit3')
        ],
      },
      breakglass: [
        game.add.audio('breakglass1'),
        game.add.audio('breakglass2'),
        game.add.audio('breakglass3')
      ],
      breakmetal: [
        game.add.audio('breakmetal1'),
        game.add.audio('breakmetal2'),
        game.add.audio('breakmetal3')
      ],
      ready: [
        game.add.audio('ready')
      ],
      thisway: [
        game.add.audio('thisway')
      ],
    };
  }

}

export default Audio;
