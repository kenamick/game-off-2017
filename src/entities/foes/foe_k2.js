// foe_k2.js - Type K2 foe
import Globals from '../../globals';
import { Npc } from './npc';
import { Animations } from './animations';

class FoeK2 extends Npc {

  constructor(game, sprite, level = 1, options = {}) {
    super(game, sprite, {
      // entity health
      maxHealth: 70,

      // make entity bigger in size
      scale: 1.25,

      // entity AI behavior & control
      ai: {
        LEVEL: level,
        SPEED: 22,
        DAMAGE: 20,
        ENGAGE_RANGE: 96 * 96, // default 96 pixels
        ATTACK_RANGE: 22 * 22, // 27 pixels,
        ATTACK_SPEED: 2000, // ms
        COOLDOWN: 1200, // ms
        ENGAGE_TRESHOLD: 5, // engage only when no more than X enemies are already engaging

        // x and y offset to stop before approaching the player
        // plus random positioning offsets
        EPSILON_X: 8 + game.rnd.integerInRange(0, 12),
        EPSILON_Y: 1,

        // custom options override
        ...options.ai
      },

      // AABB walking collision boxes
      collisions: {
        weight: 2,
        torsobody: [12, 22, 9, 9],
        attackbody: [12, 10, 18, 24],
        walkbody: [16, 8, 15, 40] 
      },

      // entity specific animations
      anims: Animations.k1(sprite),
    });

  }

}

export { FoeK2 };
