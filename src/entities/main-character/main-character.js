// https://phaser.io/examples/v2/bitmapdata/atlas
import 'pixi';
import 'p2';
import Phaser from 'phaser';

window.onload = function() {
  // aspec ratio - (160/400)= 0,4
  var game = new Phaser.Game(400, 160, Phaser.CANVAS, '',
    { init: init, preload: preload, create: create, update: update, render: render });

  var pixel = { scale: 4, canvas: null, context: null, width: 0, height: 0 };

  var hero;
  var cursors;
  var fps;

  function init() {
    // game screen scaling (renders to a backbuffer and copies to main canvas)
    // http://www.photonstorm.com/phaser/pixel-perfect-scaling-a-phaser-game

    //  Hide the un-scaled game canvas
    game.canvas.style['display'] = 'none';
    //  Create our scaled canvas. It will be the size of the game * whatever scale value you've set
    pixel.canvas = Phaser.Canvas.create(game.width * pixel.scale, game.height * pixel.scale);
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

  const url = require('../../assets/third-party/characters-sprites/characters-sprites.png');
  const json = require('file-loader!../../assets/third-party/characters-sprites/characters-sprites.json')

  function preload() {
    game.load.atlas('world',
      url,
      json,
      Phaser.Loader.TEXTURE_ATLAS_JSON_HASH
    );
  }

  function create() {
      // fps
      game.time.advancedTiming = true;

      cursors = game.input.keyboard.createCursorKeys();

      // simple physics engine
      game.physics.startSystem(Phaser.Physics.ARCADE);

      var font = { font: '11px Arial', fill: 'white' };
      game.add.text(5, 2, 'Test Animations', font);
      fps = game.add.text(95, 2, 'FPS: 0', font);

      game.stage.backgroundColor = '#185d5b';

      //game.add.bitmapText(380, 150, 'USE THE ARROW KEYS TO MOVE', 'Bitmap Fonts', 48);

      hero = game.add.sprite(50, 50, 'world', 'hero_stand_01');
      hero.anchor.set(0.5, 0.5);

      hero.animations.add('stand', Phaser.Animation.generateFrameNames('hero_stand_', 1, 3, '', 2), 5, true);
      hero.animations.add('walk', Phaser.Animation.generateFrameNames('hero_walk_', 1, 6, '', 2), 10, true);
      hero.animations.add('combo', Phaser.Animation.generateFrameNames('hero_combo_', 1, 6, '', 2), 10, true);
      hero.animations.play('stand');

      game.physics.arcade.enable(hero);

      // camera follows hero
      game.camera.follow(this.sprite);
  }

  function render() {
    //  Every loop we need to render the un-scaled game canvas to the displayed scaled canvas:
    pixel.context.drawImage(game.canvas, 0, 0, game.width, game.height,
      0, 0, pixel.width, pixel.height);
  }

  var SPEED = 40;

  function update() {
    fps.setText('FPS:' + game.time.fps);

    var keydown = false;

    if (game.input.keyboard.isDown(Phaser.Keyboard.W)) {
      keydown = true;
      hero.body.velocity.y = -SPEED;
      hero.animations.play('walk');
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.S)) {
      keydown = true;
      hero.body.velocity.y = SPEED;
      hero.animations.play('walk');
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.A)) {
      keydown = true;

      hero.body.velocity.x = -SPEED;
      hero.scale.x = 1;
      hero.animations.play('walk');
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.D)) {
      keydown = true;

      hero.body.velocity.x = SPEED;
      hero.scale.x = -1;
      hero.animations.play('walk');
    }

    // this needs more work
    // once enter is pressed the animation stops
    if (game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
      keydown = true;

      hero.animations.play('combo');
    }

    if (!keydown) {
      hero.body.velocity.x = 0;
      hero.body.velocity.y = 0;
      hero.animations.play('stand');
    }

  }
};
