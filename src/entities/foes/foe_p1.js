// foe_p1.js - Type 'P1' NPC
import Globals from '../../globals';

// TODO
// This is a placeholder for Foe 1 NPC! More work needs to be done here.
// Right now it extends Phaser.Sprite which is probably the right way to do
// this given that we use createFromObjects() in Gameplay#_placeActors() to
// spawn all actors on the map.

class FoeP1 extends Phaser.Sprite {

  constructor(game, x, y, key, frame) {
    super(game, x, y, key, 'foe_stand_01');

    // fixes Tiled x-offset - for some reason Phaser spawns the sprite left 
    // from the top x coordinate specified in the map
    this.x += 48;

    // this.anchor.set(0.5, 0.5);
    console.log('foe', this.x, this.y, this.width, this.height);

    game.physics.arcade.enable(this);

    // binds all foe animation frames
    this.animations.add('stand',
      Phaser.Animation.generateFrameNames('foe_stand_', 1, 4, '', 2), 5, true);
    this.animations.add('walk',
      Phaser.Animation.generateFrameNames('foe_walk_', 1, 4, '', 2), 10, true);
    this.animations.add('hit',
      Phaser.Animation.generateFrameNames('foe_hit', 1, 2, '', 2), 5, true);
    this.animations.add('attack',
      Phaser.Animation.generateFrameNames('foe_attack_', 1, 3, '', 2), 10, true);

    this.animations.play('stand');
  }

  update() {
    // TODO
    this.scale.x = -1;

    if (Globals.debugPhysics) {
      this.game.debug.body(this);
    }
  }

}

export { FoeP1 };