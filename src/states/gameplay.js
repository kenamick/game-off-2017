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
  WALK_CONSTRAINT_Y: 96
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

  /**
   * Checks positions of sprites in groups for constraints.
   * This will swap a sprite from behind to front and vice versa groups.
   */
  updateZOrders() {
    // TODO: this could probably be further optimized
    for (let sprite of this.behindGroup.children) {
      if (sprite.bottom > TileMapConsts.FG_Y) {
        this.behindGroup.remove(this.player.sprite);
        this.frontGroup.add(this.player.sprite);
      }
    }

    for (let sprite of this.frontGroup.children) {
      if (sprite.bottom < TileMapConsts.FG_Y) {
        this.frontGroup.remove(this.player.sprite);
        this.behindGroup.add(this.player.sprite);
      }
    }
  }

  updateCollisions(group) {
    // TODO pass walk constraints as params, so that other levels
    // can specify something different

    for (let sprite of group.children) {
      if (sprite.bottom - 5 < TileMapConsts.WALK_CONSTRAINT_Y && 
        sprite.body.velocity.y < 0) {
        //sprite.body.velocity.x = 0;
        sprite.body.velocity.y = 0;
      }
    }
  }

  update() {
    super.update();
    
    this.updateZOrders();
    this.updateCollisions(this.frontGroup);
    this.updateCollisions(this.behindGroup);
  }

}

export { GamePlay, GamePlayConsts, TileMapConsts };