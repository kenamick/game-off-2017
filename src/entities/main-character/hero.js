// hero.js - Brian Freezby 
import Globals from '../../globals';
import Controls from '../../controls';
import Actor from '../actor';

const HeroConsts = {
  PUNCH_DAMAGE: 10,
  KICK_DAMAGE: 15,
  HEALTH: 100,
  SPEED: 40,
  KNOCKOUT_TIME: 600, // ms
  KNOCKBACK: 5, // pixels
  // types
  NO_HIT: false,
  PUNCH_HIT: 1,
  KICK_HIT: 2,
};

class Hero extends Actor {

  constructor(game, sprite) {
    super(game, sprite, 'hero_stand_01'); 

    this.resetHealth(HeroConsts.HEALTH);

    // bind animation frames
    const anims = this._sprite.animations;
    this.anims = {
      stand: anims.add('stand', Phaser.Animation.generateFrameNames(
        'hero_stand_', 1, 3, '', 2), 8, true),
      walk: anims.add('walk', Phaser.Animation.generateFrameNames(
        'hero_walk_', 1, 6, '', 2), 14, true),
      punch: anims.add('punch', Phaser.Animation.generateFrameNames(
        'hero_combo_', 1, 4, '', 2), 10, false),
      kick: anims.add('kick', Phaser.Animation.generateFrameNames(
        'hero_combo_', 5, 6, '', 2), 8, false),
      jump: anims.add('jump', Phaser.Animation.generateFrameNames(
        'hero_jump_', 1, 3, '', 2), 10, false),
      airkick: anims.add('airkick', Phaser.Animation.generateFrameNames(
        'hero_airkick_', 1, 1, '', 2), 10, false),
      hit: anims.add('hit', ['hero_hit_01'], 1, true)
    };
    this._attachAnimEvents();
    this._sprite.animations.play('stand');

    // setup physics
    this._setupBody();

    // sets anchor in the middle of the sprite, so that we can flip it
    // when moving left/right
    this._sprite.anchor.set(0.5);
    this.faceRight();

    // camera always follows the main player
    game.camera.follow(this._sprite);

    // game.input.addKeys API is not sufficient since
    // character needs to be aslo controlled by gamepad and AI
    this.controls = new Controls(game);
    this._controlsEnabled = true;

    // game ends when the player's killed
    this._sprite.events.onKilled.add(() => this.game.state.start('gameover'));

    // reset actions
    this.attack = {
      isAttacking: false,
      damage: 0,
      checkHits: HeroConsts.NO_HIT
    };

    this._isHit = false;
  }

  _setupBody() {
    // walk body
    this.game.physics.arcade.enable(this._sprite);
    this._sprite.body.setSize(18, 8, 15, 40);
    this._sprite.body.collideWorldBounds = true;

    // fight hit boxes
    const hitboxes = this.game.add.group();
    hitboxes.enableBody = true;
    this.game.physics.arcade.enable(hitboxes);

    // punch
    const punch = hitboxes.create(0, 0, null);
    punch.anchor.set(0.5);
    punch.body.setSize(16, 12, 24, 12); // reach=40
    punch.name = 'punch';

    // kick
    const kick = hitboxes.create(0, 0, null);
    kick.anchor.set(0.5);
    kick.body.setSize(17, 10, 22, 18); // reach=39
    kick.name = 'kick';

    // torso
    const torso = hitboxes.create(0, 0, null);
    torso.anchor.set(0.5);
    torso.body.setSize(15, 22, 8, 9);
    torso.name = 'torso';

    for (const h of hitboxes.children) {
      h.reset(0, 0);
    }

    this._sprite.addChild(hitboxes);
    this.hitboxes = hitboxes;
  }

  get torso() {
    // torso
    return this.hitboxes.children[2];
  }

  _attachAnimEvents() {
    this.anims.punch.onComplete.add(() => {
      // reset animation frame to start
      this.anims.punch.stop(true);

      // play sfx
      this.game.audio.play(this.game.audio.sfx.hero.punch, true);
      
      this.attack.isAttacking = false;
      this.attack.damage = HeroConsts.PUNCH_DAMAGE;
      this.attack.checkHits = HeroConsts.PUNCH_HIT;
    });
    this.anims.kick.onComplete.add(() => {
      // reset animation frame to start
      this.anims.kick.stop(true);

      // play sfx
      this.game.audio.play(this.game.audio.sfx.hero.kick, true);

      this.attack.isAttacking = false;
      this.attack.damage = HeroConsts.KICK_DAMAGE;
      this.attack.checkHits = HeroConsts.KICK_HIT;
    });
  }

  kill() {
    this.stop(null);

    // make the player sprite kind of lying on the ground
    this._sprite.angle = -90;
    this._sprite.y += this._sprite.height * 0.35;
    // detach camera
    this.game.camera.follow(null);

    super.kill();
  }

  damage(amount) {
    if (super.damage(amount)) {
      this.kill();
    } else {
      this.stop(null)
      this._sprite.animations.play('hit');

      // don't move
      this._controlsEnabled = false;
      this._isHit = true;

      // respawn move
      this.game.time.events.add(HeroConsts.KNOCKOUT_TIME, () => {
        this._controlsEnabled = true;
        // player can hit again
        this.attack.isAttacking = false;

        // leave the player some time to move out of the mele
        const tween = this.game.add.tween(this._sprite).to({ alpha: 0 }, 
          HeroConsts.KNOCKOUT_TIME / 5, Phaser.Easing.Linear.None, true, 0, 
          HeroConsts.KNOCKOUT_TIME / 100, true);

        tween.onComplete.add(() => {
          this._isHit = false;
        });
      });
    }
  }

  get isHit() {
    return this._isHit;
  }

  get controlsEnabled() {
    return this._controlsEnabled;
  }

  set controlsEnabled(value) {
    this._controlsEnabled = value;
    if (!value) {
      this.stop();
    }
  }

  stand() {
    this._sprite.animations.stop();
    this._sprite.frameName = 'hero_stand_01';
  }

  knockBack(xpos, distance = HeroConsts.KNOCKBACK) {
    if (xpos < this._sprite.x) {
      this._sprite.x += distance;
    } else {
      this._sprite.x -= distance;
    }
  }

  faceLeft() {
    this._sprite.scale.x = 1;
    // mirror hitboxes
    for (const h of this.hitboxes.children) {
      h.scale.x = -1;
    }
  }

  faceRight() {
    this._sprite.scale.x = -1;
    // mirror hitboxes
    for (const h of this.hitboxes.children) {
      h.scale.x = 1;
    }
  }

  update(enemies) {
    if (!super.update()) {
      return false;
    }

    if (!this._controlsEnabled) {
      return false;
    }

    const game = this.game;

    if (this.attack.checkHits !== HeroConsts.NO_HIT) {
      // test against punch or kick hit box
      // XXX don't use array indexes but constants or object names
      const hitbox = this.attack.checkHits === HeroConsts.PUNCH_HIT ? 
        this.hitboxes.children[0] : this.hitboxes.children[1];

      // test enemies
      // TODO: maybe only test those that are in close proximity
      for (const actor of enemies) {
        if (!actor.hit && !actor.dead) {
          game.physics.arcade.collide(hitbox, actor.torso, (o1, o2) => {
            actor.damage(this.attack.damage);
          });
        }
      }

      // reset test
      this.attack.checkHits = HeroConsts.NO_HIT;
    }

    if (!this.attack.isAttacking) {
      if (this.controls.punch) {
        this.attack.isAttacking = true;
        this.anims.punch.play();
      } else if (this.controls.kick) {
        this.attack.isAttacking = true;
        this.anims.kick.play();
      }

      if (this.attack.isAttacking) {
        // reset movement vector when attacking
        this._sprite.body.velocity.x = 0;
        this._sprite.body.velocity.y = 0;
      }
    }

    if (!this.attack.isAttacking) {
      let moving = false;

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

      if (moving) {
        this._sprite.animations.play('walk');
      } else {
        this._sprite.body.velocity.x = 0;
        this._sprite.body.velocity.y = 0;
        this._sprite.animations.play('stand');
      }

    }
  }

}

export { Hero, HeroConsts };
