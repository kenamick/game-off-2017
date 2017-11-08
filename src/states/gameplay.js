// gameplay.js 
// Game levels, mechanics, entities, etc.

import Renderer from './renderer';

class GamePlay extends Renderer {

  create() {
    this.game.stage.backgroundColor = '#185d5b';
    
    //this.game.add.bitmapText(380, 150, 'USE THE ARROW KEYS TO MOVE', 'Bitmap Fonts', 48);

    this.hero = this.game.add.sprite(50, 50, 'world', 'hero_stand_01');
    this.hero.anchor.set(0.5, 0.5);

    this.hero.animations.add('stand', Phaser.Animation.generateFrameNames('hero_stand_', 1, 3, '', 2), 5, true);
    this.hero.animations.add('walk', Phaser.Animation.generateFrameNames('hero_walk_', 1, 6, '', 2), 10, true);
    this.hero.animations.add('combo', Phaser.Animation.generateFrameNames('hero_combo_', 1, 6, '', 2), 10, true);
    this.hero.animations.play('stand');

    this.game.physics.arcade.enable(this.hero);
    
    // camera follows hero
    this.game.camera.follow(this.hero);

  }

}

export { GamePlay };