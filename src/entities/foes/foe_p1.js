// foe_p1.js - Type P1 foe
import Globals from '../../globals';
import { Npc } from './npc';
import { Animations } from './animations';

class FoeP1 extends Npc {

  constructor(game, sprite, level = 1) {
    super(game, sprite, {
      // entity health
      maxHealth: 30,
      // entity AI behavior & control
      ai: {
        LEVEL: level,
        SPEED: 30,
        DAMAGE: 10,
        ENGAGE_RANGE: 84 * 84, // 84 pixels
        ATTACK_RANGE: 20 * 20, // 8 pixels,
        ATTACK_SPEED: 1500, // ms
        COOLDOWN: 1300, // ms (pause after they get hit)
        ENGAGE_TRESHOLD: 2, // engage only when no more than X enemies are already engaging

        // x and y offset to stop before approaching the player
        // plus random positioning offsets
        EPSILON_X: 16 + game.rnd.integerInRange(0, 10),
        EPSILON_Y: 2 + game.rnd.integerInRange(0, 2),
      },
      // AABB walking collision boxes
      collisions: {
        weight: 1,
        torsobody: [14, 22, 8, 9],
        attackbody: [14, 10, 21, 14],
        walkbody: [16, 8, 15, 40],
      },
      // entity specific animations
      anims: Animations.p1(sprite),
    });
  }
}

export { FoeP1 };
