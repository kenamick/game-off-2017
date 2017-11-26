// k1.js - Type K1 foe
import Globals from '../../globals';
import { Npc } from './npc';
import { Animations } from './animations';

class FoeK1 extends Npc {

  constructor(game, sprite, level = 1) {
    super(game, sprite, {
      // entity health
      maxHealth: 50,
      // entity AI behavior & control
      ai: {
        LEVEL: level,
        SPEED: 30,
        ENGAGE_RANGE: 72 * 72, // 72 pixels
        ATTACK_RANGE: 12 * 12, // 12 pixels,
        ATTACK_SPEED: 1500, // ms
        ENGAGE_TRESHOLD: 2, // engage even less than X enemies are already engaging

        // x and y offset to stop before approaching the player
        // plus random positioning offsets
        EPSILON_X: 5 + game.rnd.integerInRange(0, 6),
        EPSILON_Y: 2 + game.rnd.integerInRange(0, 2),
      },
      // AABB walking collision boxes
      collisions: {
        walkbody: [16, 8, 15, 40] 
      },
      // entity specific animations
      anims: Animations.k1(sprite),
    });
  }
}

export { FoeK1 };
