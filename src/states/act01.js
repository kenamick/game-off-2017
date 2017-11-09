// act01.js 
// Level 1 gameplay implementation

import Renderer from './renderer';
import GamePlay from './gameplay';
import { Hero } from '../entities/main-character';

class Act1 extends GamePlay {

  create() {
    super.create();

    // TODO: make this work when act1 is complete in Tiled
    this.game.world.setBounds(0, 0, 10 * 48, 10 * 48);

    this.map = this.game.add.tilemap('act1');
    this.map.addTilesetImage('gd-tileset', 'gd-tiles');

    this.layers = {
      paralax: this.map.createLayer('paralax'),
      background: this.map.createLayer('background'),
      foreground: this.map.createLayer('foreground')
    };

    this.player = new Hero(this.game);
    this.player.spawn(50, 144);
  }

  update() {
    super.update();

    this.player.update();
  }

}

export { Act1 };