// npc.js - Base Foe NPC routines
import Globals from '../../globals';
import Actor from '../actor';
import { Sounds } from './sounds';

const AIStates = {
  IDLE: 1,
  MOVE: 2,
  ATTACK: 3,
  HIT: 4,
  DEAD: 5
};

class Npc extends Actor {

  constructor(game, sprite, options) {
    super(game, sprite, options.anims.dyingFrame);

    // setup sprite
    this._sprite.anchor.set(0.5);
    this.faceLeft();

    this.resetHealth(options.maxHealth);

    // binds all foe animation frames
    this.anims = options.anims;
    this._attachAnimEvents();

    // setup physics body
    this._setupBody(options);

    if (options.scale) {
      this.sprite.scale.x = options.scale;
      this.sprite.scale.y = options.scale;
    }

    // setup AI
    this.ai = {
      ...options.ai,
      state: AIStates.IDLE, // default
      canAttack: true, // default
      isHit: false, // default
    };

    // default is always idle
    this.idle = true;

    // bind sfx
    if (options.sfx) {
      this.sfx = options.sfx;
    } else {
      this.sfx = Sounds.default(this.game.audio);
    }
  }

  _setupBody(options) {
    this.game.physics.arcade.enable(this._sprite);
    this._sprite.body.setSize(...options.collisions.walkbody);
    // this._sprite.body.collideWorldBounds = true;

    // fight hit boxes
    const hitboxes = this.game.add.group();
    hitboxes.enableBody = true;
    this.game.physics.arcade.enable(hitboxes);

    // torso
    const hitbox1 = hitboxes.create(0, 0, null);
    hitbox1.anchor.set(0.5);
    hitbox1.body.setSize(15, 22, 10, 9);
    hitbox1.name = 'torso';

    for (const h of hitboxes.children) {
      h.reset(0, 0);
    }

    this._sprite.addChild(hitboxes);
    this.hitboxes = hitboxes;
  }

  hitboxes() {
    return this.hitboxes;
  }

  _attachAnimEvents() {
    this.anims.attack.onComplete.add(() => {
      // reset animation frame to start
      this.anims.attack.stop(true);

      // play sfx
      this.game.audio.play(this.sfx.attack, true);

      // TODO: notify player collision detection!
      
      // go to idle mode as soon as animation ends
      this.idle = true;

      // reset the canAttack timer, so animation can be played again in attack()
      this.game.time.events.add(this.ai.ATTACK_SPEED, () => {
        this.ai.canAttack = true;
      });
    });

    this.anims.hit.onComplete.add(() => {
      // play sfx
      //this.game.audio.play(this.sfx.attack, true);
      // reset the canAttack timer, so animation can be played again in attack()
      this.game.time.events.add(this.ai.COOLDOWN, () => {
        // reset animation frame to start
        this.anims.hit.stop(true);
        this.anims.attack.stop(true);

        this.ai.canAttack = true;
        this.ai.isHit = false;

        // go to idle mode as soon as animation ends
        this.idle = true;
      });
    });
  }

  isInEngageRange(x, y) {
    // if (this.ai.state === AIStates.IDLE) {
      const dist = this.game.math.distanceSq(this._sprite.x, this._sprite.y, x, y);
      return dist <= this.ai.ENGAGE_RANGE;
    // }
    // // already engaging
    // return false;
  }

  isInAttackRange(x, y) {
    const dist = this.game.math.distanceSq(this._sprite.x, this._sprite.y, x, y);
    return dist <= this.ai.ATTACK_RANGE;
  }

  isCanEngage(count) {
    return this.ai.state === AIStates.IDLE && count < this.ai.ENGAGE_TRESHOLD;
  }

  get engaged() {
    return this.ai.state !== AIStates.IDLE && 
      this.ai.state !== AIStates.DEAD && 
      this.ai.state != AIStates.HIT;
  }

  set engaged(value) {
    this.ai.state = value ? AIStates.MOVE : AIStates.IDLE;
  }

  get idle() {
    return this.ai.state === AIStates.IDLE;
  }

  set idle(value) {
    super.stop();
    this.ai.state = AIStates.IDLE;
  }

  get dead() {
    return this.ai.state === AIStates.DEAD;
  }

  get hit() {
    return this.ai.state === AIStates.HIT;
  }

  moveTo(actor) {
    // target's location
    const x = actor.sprite.x;
    const y = actor.sprite.y;

    const { ATTACK_RANGE, EPSILON_X, EPSILON_Y, SPEED } = this.ai;

    let moving = false;

    // get in defined x-proximity to hit
    const dist = this.game.math.distanceSq(this._sprite.x, 0, x, 0);
    if (dist > ATTACK_RANGE) {
      if (this._sprite.x > x + EPSILON_X) {
        moving = true;
        this.faceLeft(); // direction of movement
        this._sprite.body.velocity.x = -SPEED;
      } else if (this._sprite.x < x - EPSILON_X) {
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
      // stop chasing, if too far
      if (!this.isInEngageRange(actor.sprite.x, actor.sprite.y)) {
        this.idle = true;
      }
    } else {
      this._sprite.animations.play('stand');
      // target must have been reached
      this.ai.state = AIStates.ATTACK;
    }
  }

  attack(actor) {
    // console.log(this.ai.canAttack, this.anims.attack.isPlaying)
    if (this.ai.canAttack && !this.anims.attack.isPlaying) {
      // set flag that this NPC attacks atm
      this.ai.canAttack = false;
      // play the hitting animation
      this.anims.attack.play(null, false);
    }

    // stop chasing, if too far
    if (!this.isInEngageRange(actor.sprite.x, actor.sprite.y)) {
      this.idle = true;
    }
  }

  doHit(damage) {
    this.ai.state = AIStates.HIT;
    super.stop(null);

    if (this.damage(damage)) {
      this.kill();
    }

    if (!this.dying && !this.anims.hit.isPlaying) {
      // set flag that this NPC attacks atm
      this.ai.canAttack = false;
      this.ai.isHit = true;
      // play the hitting animation
      this.anims.hit.play(null, false);
    }
  }

  faceTo(actor) {
    if (this._sprite.x < actor.sprite.x) {
      this.faceRight();
    } else {
      this.faceLeft();
    }
  }

  kill() {
    this.ai.state = AIStates.DEAD;
    // play sfx
    this.game.audio.play(this.sfx.death, true);
    // he disappeared mysteriously...
    super.kill();
  }

  update(player, engaging) {
    if (!super.update()) {
      // stop movement, but don't play stand animation
      // this is usually the case when this actor's dying
      this.stop(null);
      return false;
    }

    // always face the player
    if (!this.ai.isHit) {
      this.faceTo(player);
    }

    switch (this.ai.state) {
      case AIStates.MOVE:
        this.moveTo(player);
      break;

      case AIStates.ATTACK:
        this.attack(player);
      break;

      case AIStates.IDLE:
      case AIStates.HIT:
      case AIStates.DEAD:
      default:
        // Doh! Do nothing. Stay there like a goon.
      break;
    }

  }

}

export { Npc, AIStates };
