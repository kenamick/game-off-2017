// actor.js - base class for the player/hero and NPCs

class Actor {

  constructor(game, sprite, maxHealth) {
    this.game = game;
    this._sprite = sprite;

    this._maxHealth = maxHealth;
    this._sprite.health = maxHealth;
  }

  spawn(x, y) {
    this._sprite.x = x;
    this._sprite.y = y;
    this._sprite.revive(this._maxHealth);
  }

  get sprite() {
    return this._sprite;
  }

  get maxHealth() {
    return this._maxHealth;
  }

  update() {
    if (!this._sprite.alive) {
      // dead space
      return false;
    }

    return true;
  }

}

export default Actor;