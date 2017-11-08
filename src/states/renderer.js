// renderer.js - Base class.
// Each state needs to extend from the Renderer.

let fps;

class Renderer {

  constructor(game) {
    this.game = game;
  }

  /**
   * Scales game screen.
   *
   * Renders to a backbuffer and copies to main canvas. This needs to be called
   * only once when initializing the game.
   *
   * @see http://www.photonstorm.com/phaser/pixel-perfect-scaling-a-phaser-game
   */
  init() {
    // scale the game 2x (make game 480x320 wide, still 3:2 ratio)
    this.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;

    this.setScale();
    window.onresize = () => {
      this.setScale();
      const scale = window.innerHeight / this.game.height;

    }

    // enable crisp rendering
    this.game.renderer.renderSession.roundPixels = true;
    Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);
  }

  setScale() {
    let scale = window.innerHeight / this.game.height;

    if (window.innerWidth < window.innerHeight * this.game.scale.aspectRatio) {
      scale = window.innerWidth / this.game.width
    }

    console.log(scale)

    this.game.scale.setUserScale(scale, scale);
  }

  enableFps() {
    let font = { font: '11px Arial', fill: 'white' };
    fps = this.add.text(5, 5, '', font);
  }

  update() {
    if (fps) {
      fps.setText(this.game.time.fps + 'fps');
    }
  }

}

export default Renderer;
