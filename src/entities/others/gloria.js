// gloria.js - Gloria Freezby
import Globals from '../../globals';
import Actor from '../actor';

class Gloria extends Actor {

  constructor(game, sprite) {
    super(game, sprite);

    this._sprite.anchor.set(0.5);
    this.faceLeft();

    const anims = this._sprite.animations;
    anims.add('stand', ['gloria_stand_01', 'gloria_stand_02'], 0.5, true);

    this.stand();
  }

  _stopTimer() {
    if (this.animsEvent) {
      //this.animsEvent.timer.stop();
      // this.animsEvent.destroy();
      this.game.time.events.remove(this.animsEvent);
    }
  }

  lifted() {
    this._stopTimer();
    this._sprite.animations.stop();
    this._sprite.frameName = 'gloria_lifted_01';

    this._sprite.angle = 40;
    //this._sprite.y += this._sprite.height * 0.35;
  }

  stand() {
    this._stopTimer();
    this._sprite.animations.play('stand');
  }

  angry() {
    this._stopTimer();
    this._sprite.animations.stop();
    this._sprite.frameName = 'gloria_angry_01';
  }

  standAngry() {
    this._stopTimer();
    this._sprite.animations.stop();
    this._sprite.frameName = 'gloria_angry_01';

    this.animsEvent = this.game.time.events.loop(2000, () => {
      this._sprite.frameName = 'gloria_angry_0' + this.game.rnd.integerInRange(1, 4);
      // play sfx
      if (this.game.rnd.integerInRange(0, 10) > 7) {
        this.game.audio.play(this.game.audio.sfx.npc.gloria.cheer);
      }
    });
  }

}

export { Gloria };
