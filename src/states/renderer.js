// renderer.js - Base class.
// Scales the game screen and copies the scaled buffer to the canvas.
// Each state needs to extend from the Renderer.

const pixel = { 
  scale: 4, 
  canvas: null, 
  context: null, 
  width: 0, 
  height: 0 
};

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
  initOnce() {
    //  Hide the un-scaled game canvas
    this.game.canvas.style['display'] = 'none';
    
    //  Create our scaled canvas. It will be the size of the game * whatever scale value you've set
    pixel.canvas = Phaser.Canvas.create(this.game.width * pixel.scale, 
      this.game.height * pixel.scale);
    
      //  Store a reference to the Canvas Context
    pixel.context = pixel.canvas.getContext('2d');
    
    //  Add the scaled canvas to the DOM
    Phaser.Canvas.addToDOM(pixel.canvas);
    
    //  Disable smoothing on the scaled canvas
    Phaser.Canvas.setSmoothingEnabled(pixel.context, false);

    //  Cache the width/height to avoid looking it up every render
    pixel.width = pixel.canvas.width;
    pixel.height = pixel.canvas.height;
  }

  enableFps() {
    let font = { font: '11px Arial', fill: 'white' };
    fps = this.add.text(5, 5, '', font);
  }

  /**
   * Renders the unscaled canvas to the displayed canvas.
   * 
   * Needs to be called from every state in order to update the game contents
   * on screen.
   */
  render() {
    pixel.context.drawImage(this.game.canvas, 0, 0, this.game.width, this.game.height, 
      0, 0, pixel.width, pixel.height);
  }

  update() {
    fps.setText(this.game.time.fps + 'fps');
  }

}

export default Renderer;