// gloria.js - Gloria Freezby
import Globals from '../../globals';
import Actor from '../actor';

class Gloria extends Actor {

  constructor(game, sprite) {
    super(game, sprite);

    this._sprite.anchor.set(0.5);
    this.faceLeft();

    const anims = this._sprite.animations;
    anims.add('stand', ['gloria_stand_01', 'gloria_angry_01'], 0.5, true);

    this.standAngry();
  }

  lifted() {
    this._sprite.animations.stop();
    this._sprite.frameName = 'gloria_lifted_01';

    this._sprite.angle = 40;
    //this._sprite.y += this._sprite.height * 0.35;
  }

  stand() {
    this._sprite.animations.stop();
    this._sprite.frameName = 'gloria_stand_01';
  }

  standAngry() {
    this._sprite.animations.play('stand');
  }

}

export { Gloria };
