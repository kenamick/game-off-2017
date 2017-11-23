// gameplay.js
// Common game levels routines, mechanics, entities, etc.
import Audio from '../audio';
import Globals from '../globals';
import Controls from '../controls';
import Renderer from './renderer';
import SpecialFx from '../specialfx';
import {
  Hero, FoeP1, FoeK1
} from '../entities';
// Ui components
import Hud from '../ui/containers/hud';

const TileMapConsts = {
  TILE_SIZE: 48,
  LAYER_PARALAX: 'paralax',
  LAYER_BG: 'background',
  LAYER_BG_ITEMS: 'background-items',
  LAYER_FG: 'foreground',
  OBJECTS_COLLECT: 'collectables',
  OBJECTS_ACTORS: 'actors',
  FG_Y: 123, // y position where foreground sidewalk objects start,
  WALK_CONSTRAINT_Y: 96,
  COLLECTABLES: {
    // HP added is in %
    'food25': { frame: 'chicken_01', hp: 25, text: '+25%' },
    'food50': { frame: 'steak_01', hp: 50, text: '+50%' },
    'food75': { frame: 'meatloaf_02', hp: 75, text: '+75%' },
    'food100': { frame: 'chicken_02', hp: 100, text: '+100%' }
  },
  // tile coordinates helpers
  pos: (x) => x * 48,
  // mapping of tiled actors to objects
  ACTORS: {
    HERO: { name: 'hero', classType: Hero, frame: 'hero_stand_01' },
    P1: { name: 'p1', classType: FoeP1, frame: 'foe_stand_01' },
    K1: { name: 'k1', classType: FoeK1, frame: 'hero_stand_02' }
  }
};

class GamePlay extends Renderer {

  create() {
    // default sky color
    this.game.stage.backgroundColor = Globals.palette.sky.hex;

    this.audio = new Audio(this.game);
    this.specialFx = new SpecialFx(this.game);
    this.controls = new Controls(this.game);

    // The 'behind' group is basically a layer in the level the contains sprites
    // behind the sidewalk objects layer. We need to put objects either in front
    // or behind the sidewalk layer
    this.behindGroup = this.add.group();
    // The 'middle' group IS the sidewalk layer objects. This is just a static
    // image that Tiled gives us
    this.middleGroup = this.add.group();
    // The 'front' group contains all sprites that are 'in front' of the sidewalk
    this.frontGroup = this.add.group();

    // static AABB objects loaded from the game level
    this.obstaclesGroup = this.add.group();
    this.collectables = [];

    // all level npcs
    this.actors = [];
    // enemy actors only
    this.enemies = [];

    // hotpoints - stuff happens when the player crosses them
    this.hotpoints = {};
  }

  attachHud() {
    // The HUD group contains all hud ui
    this.playerHud = new Hud(this.game, this.player.sprite);
  }

  /**
   * Brings game layers to their default arrangement positions
   */
  arrangeLayers() {
    this.game.world.bringToTop(this.behindGroup);
    this.game.world.bringToTop(this.middleGroup);
    this.game.world.bringToTop(this.frontGroup);

    this.game.physics.arcade.setBoundsToWorld();
  }

  createLevel(name) {
    this.map = this.game.add.tilemap(name);
    this.map.addTilesetImage('gd-tileset', 'gd-tiles');

    this.layers = {
      paralax: this.map.createLayer(TileMapConsts.LAYER_PARALAX),
      background: this.map.createLayer(TileMapConsts.LAYER_BG),
      backgroundItems: this.map.createLayer(TileMapConsts.LAYER_BG_ITEMS),
      foreground: this.map.createLayer(TileMapConsts.LAYER_FG)
    };
    // set size of world
    this.layers.background.resizeWorld();

    for (const obj of this.map.objects.obstacles) {
      const sprite = this.game.add.sprite(obj.x, obj.y, null);

      this.game.physics.arcade.enable(sprite);
      sprite.body.setSize(obj.width, obj.height);
      // this is a non-moveable sprite
      sprite.body.immovable = true;

      // add to group of non-walkable areas
      this.obstaclesGroup.add(sprite);
    }

    // map all level hotpoints
    if (this.map.objects.hotpoints) {
      for (const hot of this.map.objects.hotpoints) {
        this.hotpoints[hot.name] = hot;
      }
    }

    this._placeCollectables(this.map);
    this._placeActors(this.map);

    // sidewalk items layer needs to be either behind or in-front
    // of on-screen sprites
    this.middleGroup.add(this.layers.foreground);
  }

  _placeCollectables(map) {
    const collectablesGroup = this.add.group();

    for (const [k, v] of Object.entries(TileMapConsts.COLLECTABLES)) {
      this.map.createFromObjects(TileMapConsts.OBJECTS_COLLECT,
        k, 'atlas_sprites', v.frame, true, true, collectablesGroup,
        Phaser.Sprite, false, false);
    }

    // XXX this is a bit crappy, but there does not seem to be away
    // to put createFromObjects() sprites directly into an array instead of
    // in a group
    for (const sprite of collectablesGroup.children) {
      this.collectables.push(sprite);
    }
    for (const sprite of this.collectables) {
      this.addSpriteToLayer(sprite, true);
    }
    //collectablesGroup.removeAll();

    this.game.physics.arcade.enable(this.collectables);
  }

  _placeActors(map) {
    const actorsGroup = this.add.group();

    for (const [k, v] of Object.entries(TileMapConsts.ACTORS)) {
      this.map.createFromObjects(TileMapConsts.OBJECTS_ACTORS,
        v.name, 'atlas_sprites', v.frame, true, true, actorsGroup,
        Phaser.Sprite, false, false);
    }

    for (const sprite of actorsGroup.children) {
      /**
       * Correct Tiled spawn position.
       */
      sprite.x += sprite.width * 0.5;
      sprite.y += sprite.height * 0.5;

      // TODO: add enemy AI level
      const actor = new TileMapConsts.ACTORS[sprite.name.toUpperCase()].classType(
        this.game, sprite);

      // just an ugly special case here, nothing to see folks, move on ...
      if (sprite.name === TileMapConsts.ACTORS.HERO.name) {
        this.player = actor;
      } else {
        this.enemies.push(actor);
      }

      this.actors.push(actor);
    }

    for (const actor of this.actors) {
      this.addSpriteToLayer(actor.sprite, true);
    }
  }

  spawnEnemy(ACTOR, x, y, level) {
    const actor = new ACTOR.classType(this.game, this.game.add.sprite(x, y,
      'atlas_sprites', ''), level);
    this.actors.push(actor);
    this.enemies.push(actor);
    this.addSpriteToLayer(actor.sprite, true);
  }

  isEnemiesDead() {
    return this.enemies.reduce((s, o) => s += o.sprite.alive ? 1 : 0, 0) === 0;
  }

  /**
   * Adds a sprite to the appropriate layer based on it's coordinates.
   *
   * @param {*} noParent true, if the sprite's neither in the behind
   * nor in the front group.
   */
  addSpriteToLayer(sprite, noParent) {
    const isInBehind = this.behindGroup.children.indexOf(sprite) > -1;

    if (sprite.bottom > TileMapConsts.FG_Y && (isInBehind || noParent)) {
      this.behindGroup.remove(sprite);
      this.frontGroup.add(sprite);
      // console.log('move to front', sprite.name, sprite.y, sprite.bottom);
    } else if (sprite.bottom < TileMapConsts.FG_Y && (!isInBehind || noParent)) {
      this.frontGroup.remove(sprite);
      this.behindGroup.add(sprite);
      // console.log('move to back', sprite.name, sprite.y, sprite.bottom);
    }
  }

  /**
   * Checks position constraints of sprites in behind/front groups.
   * This will move moveable bodies, ergo sprites, from 'behind' to 'front'
   * and vice versa.
   */
  _updateZOrders() {
    for (const sprite of this.behindGroup.children) {
      if (!sprite.immovable) {
        this.addSpriteToLayer(sprite);
      }
    }

    for (const sprite of this.frontGroup.children) {
      if (!sprite.immovable) {
        this.addSpriteToLayer(sprite);
      }
    }

    // sort all sprites by their bottom coords
    // to make overlapping more realistic
    this.behindGroup.sort('bottom', Phaser.Group.SORT_ASCENDING);
    this.frontGroup.sort('bottom', Phaser.Group.SORT_ASCENDING);
  }

  _updateCollisions(group) {
    // show obstacles positions
    if (Globals.debugPhysics) {
      for (const obj of this.obstaclesGroup.children) {
        this.game.debug.body(obj);
      }
      for (const obj of this.collectables) {
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
      }
    }
  }

  // TODO: maybe move this in the hero.js class and also
  // only check against the player's movement body and not the complete/rigid body
  updatePlayerCollisions(sprite) {
    this.physics.arcade.collide(sprite, this.collectables, (o1, o2) => {
      const food = TileMapConsts.COLLECTABLES[o2.name];
      this.specialFx.textdraw.fadingUp(o2.x, o2.y, food.text);

      // 'eat' that food
      o2.destroy();
      this.player.heal(food.hp);

      // TODO add sfx
    });
  }

  update() {
    super.update();

    if (this.player) {
      this.playerHud.update();
      this.player.update();
      this.updatePlayerCollisions(this.player.sprite);
    }

    for (const actor of this.enemies) {
      actor.update(this.player);
    }

    this._updateZOrders();
    this._updateCollisions(this.frontGroup);
    this._updateCollisions(this.behindGroup);

    // debug keys/events
    if (Globals.debug) {
      if (this.controls.debug('warpAtEnd')) {
        // teleport player at the end of the level
        this.player.sprite.x = this.game.world.width - TileMapConsts.TILE_SIZE * 1.5;
      } else if (this.controls.debug('killAll')) {
        // kill all existing enemies on the map
        this.enemies.forEach(o => o.kill());
      } else if (this.controls.debug('hurtHero')) {
        this.player.damage(Globals.hitpoints.debugRatio);
      } else if (this.controls.debug('healHero')) {
        this.player.heal(Globals.hitpoints.debugRatio);
      }
    }
  }

}

export { GamePlay, TileMapConsts };
