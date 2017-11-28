// actor.js - base class for the player/hero and NPCs
import Globals from '../globals';

class Actor {

  constructor(game, sprite, dyingFrameName) {
    this.game = game;
    this._sprite = sprite;

    this._dying = false;
    this._weight = 1;
    //this.resetHealth(sprite.maxHealth);

    // this is what is being shown when the actor die+blink activates
    this._dyingFrameName = dyingFrameName;
  }

  resetHealth(amount) {
    // alter sprite attributes
    this._sprite.maxHealth = amount;
    this._sprite.health = amount;
  }

  spawn(x, y) {
    this._sprite.x = x;
    this._sprite.y = y;
    this._dying = false;
    this._sprite.revive(this._sprite.maxHealth);
  }

  get sprite() {
    return this._sprite;
  }

  get maxHealth() {
    return this._sprite.maxHealth;
  }

  get dying() {
    return this._dying;
  }

  get weight() {
    return this._weight;
  }

  set weight(value) {
    this._weight = value;
  }

  /**
   * Damages actor.
   * 
   * Custom method, so we can display the blinking animations before killing
   * the actor sprite.
   * @param {*} amount 
   */
  damage(amount) {
    if (this._sprite.health - amount <= 0) {
      this._sprite.health = 0;
      //this.kill();
      return true;
    } else {
      this._sprite.damage(amount);
    }

    return false;
  }

  heal(amount) {
    if (this._sprite.alive) {
      this._sprite.heal(amount);
    }
  }

  kill(flicker = true) {
    // set dying flag
    // hit collisions check for 'dying' actors should be disabled!
    this._dying = true;
    
    if (this._dyingFrameName) {
      this._sprite.animations.stop();
      this._sprite.frameName = this._dyingFrameName;
    }

    if (!flicker) {
      this.game.time.events.add(1500, () => this._sprite.kill());
    } else {
      const tween = this.game.add.tween(this._sprite).to({ alpha: 0 }, 
        80, Phaser.Easing.Linear.None , true, 0, 7, true);
      tween.onComplete.add(() => this._sprite.kill());
    }
  }

  knockBack(xpos, distance) {
    let toX = this._sprite.x;
    if (xpos < this._sprite.x) {
      toX += distance / this._weight;
    } else {
      toX -= distance / this._weight;
    }
    // make it slide baby
    this.game.add.tween(this._sprite).to({ x: toX }, 
      100, Phaser.Easing.Linear.None, true);
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

  stop(anim = 'stand') {
    this._sprite.body.velocity.x = 0;
    this._sprite.body.velocity.y = 0;

    if (anim) {
      this._sprite.animations.play(anim);
    }
  }

  update() {
    if (!this._sprite.alive || this._dying) {
      // dead space
      return false;
    }

    if (Globals.debugPhysics) {
      this.game.debug.body(this._sprite);
      if (this.hitboxes) {
        for (const hb of this.hitboxes.children) {
          this.game.debug.body(hb);
        }
      }
    }

    return true;
  }

}

export default Actor;
