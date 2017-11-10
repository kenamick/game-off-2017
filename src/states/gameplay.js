// gameplay.js 
// Common game levels routines, mechanics, entities, etc.

import Renderer from './renderer';

const GamePlayConsts  ={
};

const TileMapConsts = {
  TILE_SIZE: 48,
  LAYER_PARALAX: 'paralax',
  LAYER_BG: 'background',
  LAYER_BG_ITEMS: 'background-items',
  LAYER_FG: 'foreground',
  FG_Y: 123, // y position where foreground sidewalk objects start,
};

class GamePlay extends Renderer {

  create() {
    // default sky color
    this.game.stage.backgroundColor = '#c4cfa1';
    // this.game.stage.backgroundColor = '#4D533C'; @n3tn0de's

    // contains all foreground objects - npc, player, enemies, foreground tiles, etc.
    this.behindGroup = this.add.group();
    this.frontGroup = this.add.group()

    // Debug
    this.enableFps();
  }

  createLevel(name, tilesWidth, tilesHeight) {
    this.game.world.setBounds(0, 0, 
      tilesWidth * TileMapConsts.TILE_SIZE, 
      tilesHeight * TileMapConsts.TILE_SIZE);
    
    this.map = this.game.add.tilemap(name);
    this.map.addTilesetImage('gd-tileset', 'gd-tiles');

    this.layers = {
      paralax: this.map.createLayer(TileMapConsts.LAYER_PARALAX),
      background: this.map.createLayer(TileMapConsts.LAYER_BG),
      backgroundItems: this.map.createLayer(TileMapConsts.LAYER_BG_ITEMS),
      foreground: this.map.createLayer(TileMapConsts.LAYER_FG)
    };

    // sidewalk items layer needs to be either behind or in-front 
    // of on-screen sprites
    this.frontGroup.add(this.layers.foreground);
  }

  update() {
    super.update();
    
  }

}

export { GamePlay, GamePlayConsts, TileMapConsts };