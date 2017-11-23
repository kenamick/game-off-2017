// foe_p1.js - Type 'P1' NPC

import Globals from '../../globals';
import Actor from '../actor';

const AIStates = {
  IDLE: 1,
  MOVE: 2,
  ATTACK: 3
};

const AI = {
  SPEED: 35,
  ENGAGE_RANGE: 72 * 72, // 72 pixeös
  ATTACK_RANGE: 8 * 8, // 8 pixels,
  ENGAGE_TRESHOLD: 2, // engage even less than X enemies are already engaging
};

class FoeP1 extends Actor {

  constructor(game, sprite, levelAI = 1) {
    super(game, sprite, Globals.hitpoints.enemies.p1, 'foe_hit_02');

    // Setup AI
    this.ai = {
      ...AI,
      
      // random positioning offsets
      EPSILON_X: 4 + this.game.math.random(0, 6),
      EPSILON_Y: 2 + this.game.math.random(0, 2),

      state: AIStates.IDLE,
      
      ATTACK_SPEED: 1 * 1100, // ms
      canAttack: true,
    };

    // Setup sprite
    this._sprite.anchor.set(0.5);
    this.faceLeft();

    // binds all foe animation frames
    const animations = this._sprite.animations;
    this.anims = {
      stand: animations.add('stand',Phaser.Animation.generateFrameNames(
        'foe_stand_', 1, 4, '', 2), 8, true),
      walk: animations.add('walk', Phaser.Animation.generateFrameNames(
        'foe_walk_', 1, 4, '', 2), 10, true),
      hit: animations.add('hit', Phaser.Animation.generateFrameNames(
        'foe_hit_', 1, 2, '', 2), 5, false),
      attack: animations.add('attack', Phaser.Animation.generateFrameNames(
        'foe_attack_', 1, 3, '', 2), 8, false)
    };

    this._attachAnimEvents();

    // Setup physics body
    game.physics.arcade.enable(this._sprite);
    this._sprite.body.setSize(16, 8, 15, 40);
    // this._sprite.body.collideWorldBounds = true;
  }

  _attachAnimEvents() {
    this.anims.attack.onComplete.add(() => {
      // reset animation frame to start
      this.anims.attack.stop(true);

      // TODO: play sfx
      // TODO: notify player collision detection!
      
      // go to idle mode as soon as animation ends
      this.ai.state = AIStates.IDLE;
      // reset the canAttack timer, so animation can be played again in attack()
      this.game.time.events.add(this.ai.ATTACK_SPEED, () => {
        this.ai.canAttack = true;
      });
    });
  }  

  isInEngageRange(x, y) {
    if (this.ai.state === AIStates.IDLE) {
      const dist = this.game.math.distanceSq(this._sprite.x, this._sprite.y, x, y);
      return dist <= this.ai.ENGAGE_RANGE;
    }
    // already engaging
    return false;
  }

  isInAttackRange(x, y) {
    const dist = this.game.math.distanceSq(this._sprite.x, this._sprite.y, x, y);
    return dist <= this.ai.ATTACK_RANGE;
  }

  isCanEngage(count) {
    return this.ai.state === AIStates.IDLE && count < this.ai.ENGAGE_TRESHOLD;
  }

  get engaged() {
    return this.ai.state !== AIStates.IDLE;
  }

  set engaged(value) {
    this.ai.state = value ? AIStates.MOVE : AIStates.IDLE;
  }

  moveTo(actor) {
    // target's location
    const x = actor.sprite.x;
    const y = actor.sprite.y;

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
        this.faceLeft(); // direction of movement
        this._sprite.body.velocity.x = -SPEED;
      } else if (this._sprite.x < x - EPSILON) {
        moving = true;
        this.faceRight(); // direction of movement
        this._sprite.body.velocity.x = SPEED;
      } else {
        this._sprite.body.velocity.x = 0;
      }
    } else {
      this._sprite.body.velocity.x = 0;
    }

    // always align with the player in a very close y-proximity, to hit 
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
      // target must have been reached
      this.ai.state = AIStates.ATTACK;
    }
  }

  attack(actor) {
    if (this.ai.canAttack && !this.anims.attack.isPlaying) {
      // set flag that this NPC attacks atm
      this.ai.canAttack = false;
      // play the hitting animation
      this.anims.attack.play(null, false);
    } 
  }

  stop(anim = 'stand') {
    this._sprite.body.velocity.x = 0;
    this._sprite.body.velocity.y = 0;

    if (anim) {
      this._sprite.animations.play(anim);
    }
  }

  faceTo(actor) {
    if (this._sprite.x < actor.sprite.x) {
      this.faceRight();
    } else {
      this.faceLeft();
    }
  }

  update(player, engaging) {
    if (!super.update()) {
      // stop movement, but don't play stand animation
      // this is usually the case when this actor's dying
      this.stop(null);
      return false;
    }

    // always face the player
    this.faceTo(player);

    switch (this.ai.state) {
      case AIStates.MOVE:
        this.moveTo(player);
      break;

      case AIStates.ATTACK:
        this.attack(player);
      break;

      case AIStates.IDLE:
      default:
        // Doh! Do nothing. Stay there like a goon.
      break;
    }

  }

}

export { FoeP1 };
