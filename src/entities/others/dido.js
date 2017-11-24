// dido.js - Dido the dog
import Globals from '../../globals';
import Actor from '../actor';

class Dido extends Actor {

  constructor(game, sprite) {
    super(game, sprite);
    
      this._sprite.anchor.set(0.5);
      this.faceRight();

      const anims = this._sprite.animations;
      anims.add('stand', ['dog_stand_01', 'dog_sniff_01'], 0.75, true);
  
      this.stand();
  }

  stand() {
    this._sprite.animations.play('stand');
  }

}

export { Dido };
