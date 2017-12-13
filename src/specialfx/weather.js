// textdraw.js - text drawing routines and fx

import Globals from '../globals';

class Weather {

  constructor(game) {
    this.game = game;
  }

  addRain() {
    const raindropSprite = this.game.add.graphics();
    raindropSprite.beginFill(Phaser.Color.hexToRGB(Globals.palette.sky.hex),  1)
             .drawRect(0, 0, 6, 20)
             .endFill();

    const raindropTexture = raindropSprite.generateTexture();
    this.emitter = this.game.add.emitter(this.game.world.centerX, -500, 1600);
    this.emitter.width = this.game.world.width;
    this.emitter.angle = 12;

    this.emitter.makeParticles(raindropTexture);

    this.emitter.minParticleScale = 0.1;
    this.emitter.maxParticleScale = 0.2;

    this.emitter.setYSpeed(300, 600);
    this.emitter.setXSpeed(-5, 5);

    this.emitter.minRotation = 0;
    this.emitter.maxRotation = 0;

    this.emitter.flow(2000, 5, 5, -1);
  }

  /**
   * Displays a blinking hand at the given x,y location
   */
  hand(x, y, orientation = 'down') {
    const hand = this.game.add.sprite(x, y, 'atlas_sprites', 'hand');
    hand.alpha = 1;
    // hand.scale.x = -0.9;
    // hand.scale.y = -0.9;

    switch (orientation) {
      case 'down':
        hand.scale.y = -hand.scale.y;
      break;
      case 'right':
        hand.anchor.setTo(0.5);
        hand.angle += 90;
      break;
      // more ...?
    }

    const toY = hand.y + 15;

    const tween = this.game.add.tween(hand).to({ alpha: .25, y: toY }, 
      800, Phaser.Easing.Linear.None , true, 0, -1, true);

    // tween.onLoop.add(() => {
    //   console.log('text')
    //   if (this.audio) {
    //     this.audio.play(this.audio.sfx.go);
    //   }
    // });

    return hand;
  }

}

export default Weather;
