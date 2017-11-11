// gameplay.js 
// Common game levels routines, mechanics, entities, etc.
import Globals from '../globals';
import Renderer from './renderer';
import SpecialFx from '../specialfx';

const GamePlayConsts = {
  COLORS: { SKY: '#c4cfa1' }
};

const TileMapConsts = {
  TILE_SIZE: 48,
  LAYER_PARALAX: 'paralax',
  LAYER_BG: 'background',
  LAYER_BG_ITEMS: 'background-items',
  LAYER_FG: 'foreground',
  OBJECTS_COLLECT: 'collectables',
  FG_Y: 123, // y position where foreground sidewalk objects start,
  WALK_CONSTRAINT_Y: 96,
  COLLECTABLES: {
    'food25': { frame: 'chicken_01' },
    'food50': { frame: 'steak_01' },
    'food75': { frame: 'meatloaf_2' },
    'food100': { frame: 'chicken_02' }
  }
};

class GamePlay extends Renderer {

  create() {
    // default sky color
    this.game.stage.backgroundColor = GamePlayConsts.COLORS.SKY; // '#4D533C'; @n3tn0de's

    // The 'behind' group is basically a layer in the level the contains sprites
    // behind the sidewalk objects layer. We need to put objects either in front 
    // or behind the sidewalk objects
    this.behindGroup = this.add.group();

    // front group contains all sprites that are 'in front' of the sidewalk
    this.frontGroup = this.add.group();

    // static AABB objects loaded from the game level
    this.obstaclesGroup = this.add.group();
    this.collectablesGroup = this.add.group();

    this.specialFx = new SpecialFx(this.game);
  }

  /**
   * Brings game layers to their default arrangement positions
   */
  arrangeLayers() {
    this.game.world.bringToTop(this.behindGroup);
    this.game.world.bringToTop(this.collectablesGroup);
    this.game.world.bringToTop(this.frontGroup);
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

    for (const obj of this.map.objects.obstacles) {
      const sprite = this.game.add.sprite(obj.x, obj.y, null);
      
      this.game.physics.arcade.enable(sprite);
      sprite.body.setSize(obj.width, obj.height);
      // this is a non-moveable sprite
      sprite.body.immovable = true;

      // add to group of non-walkable areas
      this.obstaclesGroup.add(sprite);
    }

    this._placeCollectables(this.map);

    // sidewalk items layer needs to be either behind or in-front 
    // of on-screen sprites
    this.frontGroup.add(this.layers.foreground);
  }

  _placeCollectables(map) {
    for (const [k, v] of Object.entries(TileMapConsts.COLLECTABLES)) {
      this.map.createFromObjects(TileMapConsts.OBJECTS_COLLECT, 
        k, 'atlas_sprites', v.frame, true, true, this.collectablesGroup, 
        Phaser.Sprite, true, false);
    }

    this.game.physics.arcade.enable(this.collectablesGroup);
  }

  addSpriteToLayer(sprite) {
    if (!sprite.immovable) {
      const isInBehind = this.behindGroup.children.indexOf(sprite) > -1;
      
      if (sprite.bottom > TileMapConsts.FG_Y && isInBehind) {
        this.behindGroup.remove(sprite);
        this.frontGroup.add(sprite);
        // console.log('move to front', sprite.name);
      } else if (sprite.bottom < TileMapConsts.FG_Y && !isInBehind) {
        this.frontGroup.remove(sprite);
        this.behindGroup.add(sprite);
        // console.log('move to back', sprite.name);
      }
    }
  }

  /**
   * Checks position constraints of sprites in behind/front groups.
   * This will move moveable bodies, ergo sprites, from 'behind' to 'front' 
   * and vice versa.
   */
  _updateZOrders() {
    for (const sprite of this.behindGroup.children) {
      this.addSpriteToLayer(sprite);
    }

    for (const sprite of this.frontGroup.children) {
      this.addSpriteToLayer(sprite);
    }
  }

  _updateCollisions(group) {
    // show obstacles positions
    if (Globals.debugPhysics) {
      for (const obj of this.obstaclesGroup.children) {
        this.game.debug.body(obj);
      }
      for (const obj of this.collectablesGroup.children) {
        this.game.debug.body(obj);
      }
    }

    for (const sprite of group.children) {
      // all moveable sprites in the group should not be allowed
      // to move across obstacles
      if (sprite.body && !sprite.body.immovable) {

        // apply sidewalk constraint
        // TODO pass walk constraints as params, so that other levels
        // can specify something different
        if (sprite.bottom - 5 < TileMapConsts.WALK_CONSTRAINT_Y && 
          sprite.body.velocity.y < 0) {
  
          //sprite.body.velocity.x = 0;
          sprite.body.velocity.y = 0;
        }

        // check against obstacles in the loaded level 'obstacles' layer
        this.physics.arcade.collide(sprite, this.obstaclesGroup);

        // check against obstacles in the loaded level 'obstacles' layer
        this.physics.arcade.collide(sprite, this.collectablesGroup, (o1, o2) => {
          // TODO add to player's health, play sound
          // 
          o2.destroy();

          this.specialFx.textdraw.fadingUp(o2.x, o2.y, 'YUMMY!');
        });
      }
    }
  }

  update() {
    super.update();
    
    this._updateZOrders();
    this._updateCollisions(this.frontGroup);
    this._updateCollisions(this.behindGroup);
  }

}

export { GamePlay, GamePlayConsts, TileMapConsts };