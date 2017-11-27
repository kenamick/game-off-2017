// hero.js - Brian Freezby 
import Globals from '../../globals';
import Controls from '../../controls';
import Actor from '../actor';

const HeroConsts = {
  SPEED: 40
};

class Hero extends Actor {

  constructor(game, sprite) {
    super(game, sprite, 'hero_stand_01'); 

    this.resetHealth(100);

    // sets anchor in the middle of the sprite, so that we can flip it
    // when moving left/right
    this._sprite.anchor.set(0.5);
    this.faceRight();

    // bind animation frames (check the json file for details/adjustments)
    this._sprite.animations.add('stand',
      Phaser.Animation.generateFrameNames('hero_stand_', 1, 3, '', 2), 8, true);
    this._sprite.animations.add('walk',
      Phaser.Animation.generateFrameNames('hero_walk_', 1, 6, '', 2), 10, true);
    this._sprite.animations.add('combo',
      Phaser.Animation.generateFrameNames('hero_combo_', 1, 6, '', 2), 10, true);
    this._sprite.animations.add('jump',
      Phaser.Animation.generateFrameNames('hero_jump_', 1, 3, '', 2), 10, true);
    this._sprite.animations.add('airkick',
      Phaser.Animation.generateFrameNames('hero_airkick_', 1, 1, '', 2), 10, true);

    this._sprite.animations.play('stand');

    // setup physics
    // TODO: this is a simple bounding box
    game.physics.arcade.enable(this._sprite);
    this._sprite.body.setSize(18, 8, 15, 40);

    this._sprite.body.collideWorldBounds = true;

    // camera always follows the main player
    game.camera.follow(this._sprite);

    // game.input.addKeys API is not sufficient since
    // character needs to be aslo controlled by gamepad and AI
    this.controls = new Controls(game);
    this._controlsEnabled = true;

    // game ends when the player's killed
    this._sprite.events.onKilled.add(() => this.game.state.start('gameover'));
  }

  kill() {
    // make the player sprite kind of lying on the ground
    this._sprite.angle = -90;
    this._sprite.y += this._sprite.height * 0.35;
    // detach camera
    this.game.camera.follow(null);

    super.kill();
  }

  stand() {
    this._sprite.animations.stop();
    this._sprite.frameName = 'hero_stand_01';
  }

  faceLeft() {
    this._sprite.scale.x = 1;
  }

  faceRight() {
    this._sprite.scale.x = -1;
  }

  get controlsEnabled() {
    return this._controlsEnabled;
  }

  set controlsEnabled(value) {
    this._controlsEnabled = value;
  }

  update() {
    if (!super.update()) {
      return false;
    }

    // show physics body
    if (Globals.debugPhysics) {
      this.game.debug.body(this._sprite);
    }

    if (!this._controlsEnabled) {
      return false;
    }

    const game = this.game;

    let moving = false;
    let combo = false;

    // console.log(this.controls.punch, this.controls.up)

    if (this.controls.punch) {
      combo = true;

      // TODO: Pressing the fight key once needs to play the first
      // few frames of the combo. Right now it is a bit choppy, needs more work.
    }

    if (!combo) {
      // The idea here is not to be able to move while fighting
      // Player has to attack from standing position.

      if (this.controls.up && !this.controls.down) {
        moving = true;
        this._sprite.animations.play('walk');

        this._sprite.body.velocity.x =
          this.controls.left || this.controls.right ?
            this._sprite.body.velocity.x : 0;
        this._sprite.body.velocity.y = -HeroConsts.SPEED;
      }

      if (this.controls.down && !this.controls.up) {
        moving = true;
        this._sprite.animations.play('walk');

        this._sprite.body.velocity.x =
          this.controls.left || this.controls.right ?
            this._sprite.body.velocity.x : 0;
        this._sprite.body.velocity.y = HeroConsts.SPEED;
      }

      if (this.controls.left && !this.controls.right) {
        moving = true;

        this.faceLeft();
        this._sprite.animations.play('walk');

        this._sprite.body.velocity.x = -HeroConsts.SPEED;
        this._sprite.body.velocity.y =
          this.controls.up || this.controls.down ?
            this._sprite.body.velocity.y : 0;
      }

      if (this.controls.right && !this.controls.left) {
        moving = true;

        this.faceRight();
        this._sprite.animations.play('walk');

        this._sprite.body.velocity.x = HeroConsts.SPEED;
        this._sprite.body.velocity.y =
          this.controls.up || this.controls.down ?
            this._sprite.body.velocity.y : 0;
      }
    }

    if (combo) {
      this._sprite.animations.play('combo');

      // reset movement vector when attacking
      this._sprite.body.velocity.x = 0;
      this._sprite.body.velocity.y = 0;
    } else if (moving) {
      this._sprite.animations.play('walk');
    } else {
      this._sprite.body.velocity.x = 0;
      this._sprite.body.velocity.y = 0;
      this._sprite.animations.play('stand');
    }
  }

}

export { Hero };
