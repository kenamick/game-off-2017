// hero.js
import Globals from '../../globals';

const HeroConsts = {
  SPEED: 60
};

class Hero {

  constructor(game) {
    this.game = game;
  }

  spawn(x, y) {
    const game = this.game;
    this._sprite = this.game.add.sprite(x, y, 'atlas_sprites', 'hero_stand_01');

    // sets anchor in the middle of the sprite, so that we can flip it
    // when moving left/right
    this._sprite.anchor.set(0.5, 0.5);

    // bind animation frames (check the json file for details/adjustments)
    this._sprite.animations.add('stand',
      Phaser.Animation.generateFrameNames('hero_stand_', 1, 3, '', 2), 5, true);
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

    // camera always follows the main player
    game.camera.follow(this._sprite);

    // game.input.addKeys API is not sufficient since
    // character needs to be aslo controlled by gamepad and AI

    game.input.gamepad.start()
    const pad1 = game.input.gamepad.pad1
    const stickThreshold = 0.1;

    // TODO: Get controls scheme from separatre config
    // Maybe move to a separate class

    this.controls = {
      get up () {
        return (
          game.input.keyboard.isDown(Phaser.Keyboard.W) ||
          game.input.keyboard.isDown(Phaser.Keyboard.UP) ||
          pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_UP) ||
          pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < -stickThreshold
        );
      },
      get down () {
        return (
          game.input.keyboard.isDown(Phaser.Keyboard.S) ||
          game.input.keyboard.isDown(Phaser.Keyboard.DOWN)||
          pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_DOWN) ||
          pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) > stickThreshold
        );
      },
      get left () {
        return (
          game.input.keyboard.isDown(Phaser.Keyboard.A) ||
          game.input.keyboard.isDown(Phaser.Keyboard.LEFT) ||
          pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) ||
          pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -stickThreshold
        );
      },
      get right () {
        return (
          game.input.keyboard.isDown(Phaser.Keyboard.D) ||
          game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) ||
          pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT) ||
          pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > stickThreshold
        );
      },
      get punch () {
        return (
          game.input.keyboard.isDown(Phaser.Keyboard.H) ||
          game.input.keyboard.isDown(Phaser.Keyboard.ENTER) ||
          pad1.isDown(Phaser.Gamepad.XBOX360_X)
        );
      },
      get jump () {
        return (
          game.input.keyboard.isDown(Phaser.Keyboard.J) ||
          game.input.keyboard.isDown(Phaser.Keyboard.SPACE) ||
          pad1.isDown(Phaser.Gamepad.XBOX360_A)
        );
      },
    }
  }

  get sprite() {
    return this._sprite;
  }

  update() {
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
        this._sprite.body.velocity.y = -HeroConsts.SPEED;
        this._sprite.animations.play('walk');
      }

      if (this.controls.down && !this.controls.up) {
        moving = true;
        this._sprite.body.velocity.y = HeroConsts.SPEED;
        this._sprite.animations.play('walk');
      }

      if (this.controls.left && !this.controls.right) {
        moving = true;

        this._sprite.body.velocity.x = -HeroConsts.SPEED;
        this._sprite.scale.x = 1;
        this._sprite.animations.play('walk');
      }

      if (this.controls.right && !this.controls.left) {
        moving = true;

        this._sprite.body.velocity.x = HeroConsts.SPEED;
        this._sprite.scale.x = -1;
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

    // show physics body
    if (Globals.debugPhysics) {
      this.game.debug.body(this._sprite);
    }
  }

}

export { Hero };
