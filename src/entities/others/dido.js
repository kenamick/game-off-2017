// dido.js - Dido the dog
import Globals from '../../globals';
import Actor from '../actor';

class Dido extends Actor {

  constructor(game, sprite) {
    super(game, sprite);

    this.moving = false;
    this.target = false;
  
    this._sprite.anchor.set(0.5);
    this.faceRight();

    const anims = this._sprite.animations;
    this.anims = {
      stand: anims.add('stand', ['dog_stand_01', 'dog_sniff_01'], 0.75, true),
      run: anims.add('run', Phaser.Animation.generateFrameNames(
        'dog_run_', 1, 3, '', 2), 8, true),
      pee: anims.add('pee', ['dog_takeleak_01', 'dog_takeleak_02'], 2, true)
    }; 

    game.physics.arcade.enable(this._sprite);

    //this.stand();
  }

  moveTo(actor, callback) {
    if (actor) {
      this.target = {
        x: actor.sprite.x - 12, 
        y: actor.sprite.y + 8,
        callback
      };
    }

    // target's location
    const { x, y } = this.target;

    const RANGE = 10 * 10;
    const EPSILON_X = 2;
    const EPSILON_Y = 2;
    const SPEED = 40;

    let moving = false;

    // get in defined x-proximity to hit
    const dist = this.game.math.distanceSq(this._sprite.x, 0, x, 0);
    if (dist > RANGE) {
      if (this._sprite.x > x + EPSILON_X) {
        this.faceRight();
        moving = true;
        this._sprite.body.velocity.x = -SPEED;
      } else if (this._sprite.x < x - EPSILON_X) {
        this.faceLeft();
        moving = true;
        this._sprite.body.velocity.x = SPEED;
      } else {
        this._sprite.body.velocity.x = 0;
      }
    } else {
      this._sprite.body.velocity.x = 0;
    }

    if (this._sprite.y > y + EPSILON_Y) {
      moving = true;
      this._sprite.body.velocity.y = -SPEED;
    } else if (this._sprite.y < y - EPSILON_Y) {
      moving = true;
      this._sprite.body.velocity.y = SPEED;
    } else {
      this._sprite.body.velocity.y = 0;
    }

    this.moving = moving;

    if (moving) {
      this._sprite.animations.play('run');
    } else {
      this._sprite.animations.stop();
      if (this.target.callback) {
        this.target.callback();
      }
    }
  }

  update() {
    if (this.moving) {
      this.moveTo();
    }
  }

  stand() {
    this._sprite.animations.play('stand');
    if (this.anims.stand.onLoop) {
      this.anims.stand.onLoop.removeAll();
    }
    this.anims.stand.onLoop.add(() => {
      if (this.game.rnd.integerInRange(0, 10) > 3) {
        this.game.audio.play(this.game.audio.sfx.dog.bark, true);
      }
    });
  }

  naughty() {
    this.game.audio.play(this.game.audio.sfx.dog.goodboy);
    this._sprite.animations.play('pee');
  }

}

export { Dido };
