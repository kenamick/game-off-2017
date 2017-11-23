// foe_p1.js - Type 'P1' NPC

import Globals from '../../globals';
import Actor from '../actor';

const AI = {
  SPEED: 35,
  ENGAGE_RANGE: 72*72, // 72 pixeös
  ATTACK_RANGE: 8*8, // 8 pixels
};

class FoeP1 extends Actor {

  constructor(game, sprite, levelAI = 1) {
    super(game, sprite, Globals.hitpoints.enemies.p1, 'foe_hit_02');

    // AI configuration
    this.ai = {
      ...AI,
      EPSILON_X: 4 + this.game.math.random(0, 6),
      EPSILON_Y: 2 + this.game.math.random(0, 2)
    };

    this._sprite.anchor.set(0.5);
    this.faceLeft();

    game.physics.arcade.enable(this._sprite);
    this._sprite.body.setSize(16, 8, 15, 40);
    // this._sprite.body.collideWorldBounds = true;

    // binds all foe animation frames
    this._sprite.animations.add('stand',
      Phaser.Animation.generateFrameNames('foe_stand_', 1, 4, '', 2), 8, true);
    this._sprite.animations.add('walk',
      Phaser.Animation.generateFrameNames('foe_walk_', 1, 4, '', 2), 10, true);
    this._sprite.animations.add('hit',
      Phaser.Animation.generateFrameNames('foe_hit_', 1, 2, '', 2), 5, true);
    this._sprite.animations.add('attack',
      Phaser.Animation.generateFrameNames('foe_attack_', 1, 3, '', 2), 10, true);

    this._sprite.animations.play('stand');
  }

  moveTo(x, y) {
    const RANGE = this.ai.ATTACK_RANGE;
    const EPSILON = this.ai.EPSILON_X;;
    const EPSILON_Y = this.ai.EPSILON_Y;
    const SPEED = this.ai.SPEED;

    let moving = false;

    // get in defined x-proximity to hit
    const dist = this.game.math.distanceSq(this._sprite.x, 0, x, 0);
    if (dist > RANGE) {
      if (this._sprite.x > x + EPSILON) {
        moving = true;
        this.faceLeft();
        this._sprite.body.velocity.x = -SPEED;
      } else if (this._sprite.x < x - EPSILON) {
        moving = true;
        this.faceRight();
        this._sprite.body.velocity.x = SPEED;
      } else {
        this._sprite.body.velocity.x = 0;
      }
    } else {
      this._sprite.body.velocity.x = 0;
    }

    // always align with the player in a very close y-proximity to hit 
    if (this._sprite.y > y + EPSILON_Y) {
      moving = true;
      this._sprite.body.velocity.y = -SPEED;
    } else if (this._sprite.y < y - EPSILON_Y) {
      moving = true;
      this._sprite.body.velocity.y = SPEED;
    } else {
      this._sprite.body.velocity.y = 0;
    }

    if (moving) {
      this._sprite.animations.play('walk');
    } else {
      this._sprite.animations.play('stand');
    }

  }

  get isMoving() {
    return this._sprite.body.velocity.x != 0 && this._sprite.body.velocity.y != 0;
  }

  stop(anim = 'stand') {
    this._sprite.body.velocity.x = 0;
    this._sprite.body.velocity.y = 0;
    if (anim) {
      this._sprite.animations.play(anim);
    }
  }

  adjustFacing(toX) {
    if (this._sprite.x < toX) {
      this.faceRight();
    } else {
      this.faceLeft();
    }
  }

  update(player, surround) {
    if (!super.update()) {
      this.stop(null);
      return false;
    }

    // always face the player
    this.adjustFacing(player.sprite.x);

    // TODO: add AI
    if (surround.length < 3) {
      const dist = this.game.math.distanceSq(
        this._sprite.x, this._sprite.y, player.sprite.x, player.sprite.y);
      
      if (dist < this.ai.ENGAGE_RANGE) {
        this.moveTo(player.sprite.x, player.sprite.y);
      }
    } else {
      this.stop();
    }
  }

}

export { FoeP1 };
