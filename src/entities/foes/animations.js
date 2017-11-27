// animations.js - supplier of foes animations

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
        'foe_walk_', 1, 4, '', 2), 10, true),
      hit: sprite.animations.add('hit', Phaser.Animation.generateFrameNames(
        'foe_hit_', 1, 2, '', 2), 5, false),
      attack: sprite.animations.add('attack', Phaser.Animation.generateFrameNames(
        'foe_attack_', 1, 3, '', 2), 6, false)
    };
  }
  
  static get standFrameK1() {
    return 'foe2_stand_01';
  }

  static k1(sprite) {
    return {
      dyingFrame: 'foe2_hit_02',
      stand: sprite.animations.add('stand', Phaser.Animation.generateFrameNames(
        'foe2_stand_', 1, 4, '', 2), 8, true),
      walk: sprite.animations.add('walk', Phaser.Animation.generateFrameNames(
        'foe2_walk_', 1, 4, '', 2), 8, true),
      hit: sprite.animations.add('hit', Phaser.Animation.generateFrameNames(
        'foe2_hit_', 1, 2, '', 2), 5, false),
      attack: sprite.animations.add('attack', Phaser.Animation.generateFrameNames(
        'foe2_attack_', 1, 3, '', 2), 8, false)
    };
  }

}

export { Animations };
