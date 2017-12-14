// weather.js - raining & weather fx

import Globals from '../globals';

class Weather {

  constructor(game) {
    this.game = game;
  }

  addRain() {
    const raindropSprite = this.game.add.graphics();
    raindropSprite.beginFill(Phaser.Color.hexToRGB(Globals.palette.sky.hex), 1)
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

    //this.emitter.fixedToCamera = true;
  }

}

export default Weather;
