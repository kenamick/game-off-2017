// actor.js - base class for the player/hero and NPCs
import Globals from '../globals';

class Actor {

  constructor(game, sprite, maxHealth, dyingFrameName) {
    this.game = game;
    this._sprite = sprite;

    this._dying = false;
    this.resetHealth(maxHealth);

    // this is what is being shown when the actor die+blink activates
    this._dyingFrameName = dyingFrameName;
  }

  resetHealth(amount) {
    this._maxHealth = amount;
    this._sprite.health = amount;
  }

  spawn(x, y) {
    this._sprite.x = x;
    this._sprite.y = y;
    this._dying = false;
    this._sprite.revive(this._maxHealth);
  }

  get sprite() {
    return this._sprite;
  }

  get maxHealth() {
    return this._maxHealth;
  }

  /**
   * Damages actor.
   * Custom method, so we can display the blinking animations before killing
   * the actor sprite.
   * @param {*} amount 
   */
  damage(amount) {
    if (this._sprite.health - amount <= 0) {
      this._sprite.health = 1;
      this.kill();
    } else {
      this._sprite.damage(amount);
    }
  }

  heal(amount) {
    if (this._sprite.alive) {
      this._sprite.heal(amount);
    }
  }

  kill() {
    // set dying flag
    // hit collisions check for 'dying' actors should be disabled!
    this._dying = true;
    
    if (this._dyingFrameName) {
      this._sprite.animations.stop();
      this._sprite.frameName = this._dyingFrameName;
    }

    const tween = this.game.add.tween(this._sprite).to({ alpha: 0 }, 
      80, Phaser.Easing.Linear.None , true, 0, 7, true);

    tween.onComplete.add(() => this._sprite.kill());
  }

  faceLeft() {
    if (this._sprite.scale.x > 0) {
      this._sprite.scale.x = -this._sprite.scale.x;
    }
  }

  faceRight() {
    if (this._sprite.scale.x < 0) {
      this._sprite.scale.x = -this._sprite.scale.x;
    }
  }

  update() {
    if (!this._sprite.alive || this._dying) {
      // dead space
      return false;
    }

    if (Globals.debugPhysics) {
      this.game.debug.body(this._sprite);
    }

    return true;
  }

}

export default Actor;
