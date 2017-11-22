// renderer.js - Base class.
// Each state needs to extend from the Renderer.
import Globals from '../globals';

let fps;

class Renderer {

  constructor(game) {
    this.game = game;
  }

  create() {
    this.resetWorld();
    // default background color
    this.game.stage.backgroundColor = Globals.palette.menuBackground.hex;
  }

  /**
   * Resets world bounds
   *
   * Needed when we change from a Tiled loaded level state back to menu
   * states.
   */
  resetWorld() {
    this.game.world.setBounds(0, 0, this.game.width, this.game.height);
    //console.log(this.game.world.width, this.game.world.height);
  }

  /**
   * Scales game screen.
   *
   * Renders to a backbuffer and copies to main canvas. This needs to be called
   * only once when initializing the game.
   *
   * @see http://www.photonstorm.com/phaser/pixel-perfect-scaling-a-phaser-game
   */
  initOnce() {
    // scale the game 2x (make game 480x320 wide, still 3:2 ratio)
    this.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;

    this.setScale();
    window.onresize = () => {
      this.setScale();
    }

    // enable crisp rendering
    this.game.renderer.renderSession.roundPixels = true;
    Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);

    // debug
    if (Globals.showFps) {
      let font = { font: '11px Arial', fill: 'white' };
      fps = this.add.text(5, 5, '', font);
    }

  }

  setScale() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    let scale = height / this.game.height;

    if (width < height * this.game.scale.aspectRatio) {
      scale = width / this.game.width
    }

    this.game.scale.setUserScale(scale, scale);
  }

  update() {
    if (fps) {
      fps.setText(this.game.time.fps + 'fps');
    }
  }

}

export default Renderer;
