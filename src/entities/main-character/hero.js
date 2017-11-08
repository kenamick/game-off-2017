// hero.js

const HeroConsts = {
  SPEED: 40
};

class Hero {

  constructor(game) {
    this.game = game;
  }

  spawn(x, y) {
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

    this.game.physics.arcade.enable(this._sprite);

    // camera always follows the main player
    this.game.camera.follow(this._sprite);    
  }

  get sprite() {
    return this._sprite;
  }

  update() {
    const game = this.game;
    
    let moving = false;
    let combo = false;

    if (game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
      combo = true;

      // TODO: Pressing the fight key once needs to play the first
      // few frames of the combo. Right now it is a bit choppy, needs more work.
    }

    if (!combo) {
      // The idea here is not to be able to move while fighting
      // Player has to attack from standing position.

      if (game.input.keyboard.isDown(Phaser.Keyboard.W)) {
        moving = true;
        this._sprite.body.velocity.y = -HeroConsts.SPEED;
        this._sprite.animations.play('walk');
      }

      if (game.input.keyboard.isDown(Phaser.Keyboard.S)) {
        moving = true;      
        this._sprite.body.velocity.y = HeroConsts.SPEED;
        this._sprite.animations.play('walk');
      }

      if (game.input.keyboard.isDown(Phaser.Keyboard.A)) {
        moving = true;

        this._sprite.body.velocity.x = -HeroConsts.SPEED;
        this._sprite.scale.x = 1;
        this._sprite.animations.play('walk');
      }

      if (game.input.keyboard.isDown(Phaser.Keyboard.D)) {
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
  }

}

export { Hero };