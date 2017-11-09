// act01.js 
// Level 1 gameplay implementation

import Renderer from './renderer';
import GamePlay from './gameplay';
import { Hero } from '../entities/main-character';

class Act1 extends GamePlay {

  create() {
    super.create();

    //Add the tilemap and tileset image. The first parameter in addTilesetImage
    //is the name you gave the tilesheet when importing it into Tiled, the second
    //is the key to the asset in Phaser
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