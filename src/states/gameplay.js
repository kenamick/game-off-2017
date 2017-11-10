// gameplay.js 
// Common game levels routines, mechanics, entities, etc.
import Globals from '../globals';
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

    // the behind group is basically a layer in the level where the sidewalk is
    // we need to put objects either in front or behind the sidewalk positioned
    // sprites
    this.behindGroup = this.add.group();

    // front group contains all sprites that are 'in front' of the sidewalk
    this.frontGroup = this.add.group();

    // obstacle AABB objects loaded from the game level will be placed here
    this.obstaclesGroup = this.add.group();
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

    for (let obj of this.map.objects.obstacles) {
      const sprite = this.game.add.sprite(obj.x, obj.y, null);
      
      this.game.physics.arcade.enable(sprite);
      sprite.body.setSize(obj.width, obj.height);
      // this is a non-moveable sprite
      sprite.body.immovable = true;

      // add to group of non-walkable areas
      this.obstaclesGroup.add(sprite);
    }

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

    // show obstacles positions
    if (Globals.debugPhysics) {
      for (const obj of this.obstaclesGroup.children) {
        this.game.debug.body(obj);
      }
    }

    for (const sprite of group.children) {
      // all moveable sprites in the group should not be allowed
      // to move across obstacles
      if (sprite.body && !sprite.body.immovable) {

        // apply sidewalk constraint
        if (sprite.bottom - 5 < TileMapConsts.WALK_CONSTRAINT_Y && 
          sprite.body.velocity.y < 0) {
  
          //sprite.body.velocity.x = 0;
          sprite.body.velocity.y = 0;
        }

        // check against obstacles in the loaded level 'obstacles' layer
        this.physics.arcade.collide(sprite, this.obstaclesGroup);
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