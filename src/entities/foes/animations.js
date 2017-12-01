// animations.js - supplier of foes animations

/**
 * Something to note here is that changing the attack animation speed also
 * affects how fast the enemy will swing towards hitting the player.
 * So it's kind of a part of the gameplay balance calculations!
 */

class Animations {

  static get standFrameP1() {
    return 'foe_stand_01';
  }

  static p1(sprite) {
    return {
      dyingFrame: 'foe_hit_02',
      stand: sprite.animations.add('stand', Phaser.Animation.generateFrameNames(
        'foe_stand_', 1, 4, '', 2), 8, true),
      walk: sprite.animations.add('walk', Phaser.Animation.generateFrameNames(
        'foe_walk_', 1, 4, '', 2), 6, true),
      hit: sprite.animations.add('hit', Phaser.Animation.generateFrameNames(
        'foe_hit_', 1, 2, '', 2), 5, false),
      attack: sprite.animations.add('attack', Phaser.Animation.generateFrameNames(
        'foe_attack_', 1, 3, '', 2), 8, false)
    };
  }

  static p2(sprite) {
    return {
      dyingFrame: 'foe_hit_02',
      stand: sprite.animations.add('stand', Phaser.Animation.generateFrameNames(
        'foe_stand_', 1, 4, '', 2), 8, true),
      walk: sprite.animations.add('walk', Phaser.Animation.generateFrameNames(
        'foe_walk_', 1, 4, '', 2), 6, true),
      hit: sprite.animations.add('hit', Phaser.Animation.generateFrameNames(
        'foe_hit_', 1, 2, '', 2), 5, false),
      attack: sprite.animations.add('attack', Phaser.Animation.generateFrameNames(
        'foe_attack_', 1, 3, '', 2), 8, false)
    };
  }

  static get standFrameK1() {
    return 'foe2_stand_01';
  }

  static k1(sprite) {
    return {
      dyingFrame: 'elite1_hit_01',
      stand: sprite.animations.add('stand', Phaser.Animation.generateFrameNames(
        'elite1_stand_', 1, 3, '', 2), 8, true),
      walk: sprite.animations.add('walk', Phaser.Animation.generateFrameNames(
        'elite1_walk_', 1, 2, '', 2), 6, true),
      hit: sprite.animations.add('hit', ['elite1_hit_01'], 5, false),
      attack: sprite.animations.add('attack', Phaser.Animation.generateFrameNames(
        'elite1_kick_', 1, 2, '', 2), 8, false)
    };
  }

  static k2(sprite) {
    return {
      dyingFrame: 'elite2_hit_01',
      stand: sprite.animations.add('stand', Phaser.Animation.generateFrameNames(
        'elite2_stand_', 1, 3, '', 2), 8, true),
      walk: sprite.animations.add('walk', Phaser.Animation.generateFrameNames(
        'elite2_walk_', 1, 2, '', 2), 6, true),
      hit: sprite.animations.add('hit', ['elite2_hit_01'], 5, false),
      attack: sprite.animations.add('attack', Phaser.Animation.generateFrameNames(
        'elite2_punch_', 1, 2, '', 2), 8, false)
    };
  }

  static get standFrameArkian() {
    return 'arkian_stand_01';
  }

  static arkian(sprite) {
    return {
      dyingFrame: 'arkian_hit_02',
      stand: sprite.animations.add('stand', Phaser.Animation.generateFrameNames(
        'arkian_stand_', 1, 3, '', 2), 8, true),
      walk: sprite.animations.add('walk', Phaser.Animation.generateFrameNames(
        'arkian_walk_', 1, 2, '', 2), 6, true),
      hit: sprite.animations.add('hit', ['arkian_hit_01'], 5, false),
      attack: sprite.animations.add('attack', Phaser.Animation.generateFrameNames(
        'arkian_punch_', 1, 2, '', 2), 8, false)
    };
  }

}

export { Animations };
