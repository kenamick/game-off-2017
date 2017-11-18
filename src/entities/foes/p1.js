// foe_p1.js - Type 'P1' NPC

import Globals from '../../globals';
import Actor from '../actor';

class FoeP1 extends Actor {

  constructor(game, sprite, levelAI = 1) {
    super(game, sprite, Globals.hitpoints.enemies.p1);

    this._sprite.anchor.set(0.5);
    this.faceLeft();

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

    // TODO: add AI
  }

}

export { FoeP1 };