// foe_k1.js - Type K1 foe
import Globals from '../../globals';
import { Npc } from './npc';
import { Animations } from './animations';

class FoeK1 extends Npc {

  constructor(game, sprite, level = 1, options = {}) {
    super(game, sprite, {
      // entity health (3 punches or 2 punches + 1 kick)
      maxHealth: 35,

      // entity AI behavior & control
      ai: {
        LEVEL: level,
        SPEED: 25,
        DAMAGE: 12,
        ENGAGE_RANGE: 96 * 96, // 96 pixels
        ATTACK_RANGE: 16 * 16, // pixels,
        ATTACK_SPEED: 1300, // ms
        COOLDOWN: 1300, // ms
        ENGAGE_TRESHOLD: 5, // engage only when no more than X enemies are already engaging

        // x and y offset to stop before approaching the player
        // plus random positioning offsets
        EPSILON_X: 8 + game.rnd.integerInRange(0, 12),
        EPSILON_Y: 1 + game.rnd.integerInRange(0, 2),

        // custom options override
        ...options.ai
      },

      // AABB walking collision boxes
      collisions: {
        weight: 1,
        torsobody: [12, 22, 9, 9],
        attackbody: [12, 10, 18, 24],
        walkbody: [16, 8, 15, 40] 
      },

      // entity specific animations
      anims: Animations.k1(sprite),
    });
  }
}

export { FoeK1 };
