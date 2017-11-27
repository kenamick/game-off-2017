// p2.js - Type P2 foe
import Globals from '../../globals';
import { Npc } from './npc';
import { Animations } from './animations';

class FoeP2 extends Npc {

  constructor(game, sprite, level = 1) {
    super(game, sprite, {
      // entity health
      maxHealth: 60,
      // entity AI behavior & control
      ai: {
        LEVEL: level,
        SPEED: 30,
        DAMAGE: 20,
        ENGAGE_RANGE: 96 * 96, // 72 pixels
        ATTACK_RANGE: 16 * 16, // 10 pixels,
        ATTACK_SPEED: 2500, // ms
        COOLDOWN: 1500, // ms
        ENGAGE_TRESHOLD: 5, // engage only when no more than X enemies are already engaging

        // x and y offset to stop before approaching the player
        // plus random positioning offsets
        EPSILON_X: 4 + game.rnd.integerInRange(0, 6),
        EPSILON_Y: 1
      },
      // AABB walking collision boxes
      collisions: {
        walkbody: [16, 8, 15, 40] 
      },
      // entity specific animations
      anims: Animations.p1(sprite),
      // make entity bigger in size
      scale: 1.25,
    });
  }

}

export { FoeP2 };
