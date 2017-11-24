// renderer.js - Base class.
// Each state needs to extend from the Renderer.
import Globals from '../globals';

class Renderer {

  constructor(game) {
    this.game = game;
  }

  create() {
    this.resetWorld();
    // default background color
    this.game.stage.backgroundColor = Globals.palette.menuBackground.hex;

    this.showFps();
  }

  showFps() {
    if (Globals.debug || Globals.showFps) {
      this.fps = this.game.add.bitmapText(7, 5, Globals.bitmapFont, '-1', 7);
      this.fps.anchor.setTo(0.5);
      this.fps.fixedToCamera = true;
      this.game.world.bringToTop(this.fps);
    }
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
    if (this.fps) {
      this.fps.text = this.game.time.fps;
    }
  }

}

export default Renderer;
