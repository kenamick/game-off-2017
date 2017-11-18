// foe_p1.js - Type 'P1' NPC

import Globals from '../../globals';
import Actor from '../actor';

class FoeP1 extends Actor {

  constructor(game, sprite) {
    super(game, sprite, Globals.hitpoints.enemies.p1);

    // fixes Tiled x-offset - for some reason Phaser spawns the sprite left 
    // from the top x coordinate specified in the map
    this._sprite.x += 48;

    game.physics.arcade.enable(this._sprite);

    // this.anchor.set(0.5, 0.5);
    //console.log('foe', this.x, this.y, this.width, this.height);

    // binds all foe animation frames
    this._sprite.animations.add('stand',
      Phaser.Animation.generateFrameNames('foe_stand_', 1, 4, '', 2), 5, true);
    this._sprite.animations.add('walk',
      Phaser.Animation.generateFrameNames('foe_walk_', 1, 4, '', 2), 10, true);
    this._sprite.animations.add('hit',
      Phaser.Animation.generateFrameNames('foe_hit_', 1, 2, '', 2), 5, true);
    this._sprite.animations.add('attack',
      Phaser.Animation.generateFrameNames('foe_attack_', 1, 3, '', 2), 10, true);

    // this is what is being shown when the actor die+flicker activates
    this.dyingFrameName = 'foe_hit_02';

    this._sprite.animations.play('stand');
  }

  update() {
    if (!super.update()) {
      return false;
    }

    // TODO
    this._sprite.scale.x = -1;

    if (Globals.debugPhysics) {
      this.game.debug.body(this._sprite);
    }
  }

}

export { FoeP1 };