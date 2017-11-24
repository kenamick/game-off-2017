// p1.js - Type P2 foe
import Globals from '../../globals';
import { Npc } from './npc';
import { Animations } from './animations';

class FoeP2 extends Npc {

  constructor(game, sprite, level = 1) {
    super(game, sprite, {
      // entity health
      maxHealth: 70,
      // entity AI behavior & control
      ai: {
        LEVEL: level,
        SPEED: 30,
        ENGAGE_RANGE: 72 * 72, // 72 pixels
        ATTACK_RANGE: 10 * 10, // 8 pixels,
        ATTACK_SPEED: 2000, // ms
        ENGAGE_TRESHOLD: 3, // engage even less than X enemies are already engaging

        // x and y offset to stop before approaching the player
        // plus random positioning offsets
        EPSILON_X: 4 + game.math.random(0, 6),
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
      // entity specific audio
      sfx: {
        // TODO sfx
      }
    });
  }

}

export { FoeP2 };
