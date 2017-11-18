// actor.js - base class for the player/hero and NPCs
import Globals from '../globals';

class Actor {

  constructor(game, sprite, maxHealth) {
    this.game = game;
    this._sprite = sprite;

    this._dying = false;
    this._maxHealth = maxHealth;
    this._sprite.health = maxHealth;
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

  kill() {
    if (this.dyingFrameName) {
      this._sprite.animations.stop();
      this._sprite.frameName = 'foe_hit_02';
    }

    // set dying flag
    // hit collisions check for 'dying' actors should be disabled!
    this._dying = true;

    const tween = this.game.add.tween(this._sprite).to({ alpha: 0 }, 
      80, Phaser.Easing.Linear.None , true, 0, 7, true);

    tween.onComplete.add(() => this._sprite.kill());
  }

  faceLeft() {
    this._sprite.scale.x = -1;
  }

  faceRight() {
    this._sprite.scale.x = 1;
  }

  update() {
    if (!this._sprite.alive) {
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