// controls.js - handles all user input

import Globals from './globals';

const stickThreshold = 0.1;

class Controls {

  constructor(game, justPressed = false) {
    this.game = game;
    // This might need a better way of being passed to the class!
    this.justPressed = justPressed;

    this.pad1 = game.input.gamepad.pad1;

    // add all possible keyboard inputs
    this.keys = {
      ups: [
        game.input.keyboard.addKey(Phaser.Keyboard.UP),
        game.input.keyboard.addKey(Phaser.Keyboard.W)
      ],
      downs: [
        game.input.keyboard.addKey(Phaser.Keyboard.DOWN),
        game.input.keyboard.addKey(Phaser.Keyboard.S)
      ],
      lefts: [
        game.input.keyboard.addKey(Phaser.Keyboard.A),
        game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
      ],
      rights: [
        game.input.keyboard.addKey(Phaser.Keyboard.D),
        game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
      ],
      punches: [
        game.input.keyboard.addKey(Phaser.Keyboard.H),
        game.input.keyboard.addKey(Phaser.Keyboard.ENTER)
      ],
      kicks: [
        game.input.keyboard.addKey(Phaser.Keyboard.J),
        game.input.keyboard.addKey(Phaser.Keyboard.SPACE)
      ],
      jumps: [
        game.input.keyboard.addKey(Phaser.Keyboard.J),
        game.input.keyboard.addKey(Phaser.Keyboard.SPACE)
      ]
    };

    // allow for testing game stuff
    // these should be disabled in production builds
    if (Globals.debug) {
      this.keys = {
        ...this.keys,
        killAll: game.input.keyboard.addKey(Phaser.Keyboard.X),
        killNearby: game.input.keyboard.addKey(Phaser.Keyboard.C),
        killVisible: game.input.keyboard.addKey(Phaser.Keyboard.V),
        warpAtEnd: game.input.keyboard.addKey(Phaser.Keyboard.B),
        hurtHero: game.input.keyboard.addKey(Phaser.Keyboard.N),
        healHero: game.input.keyboard.addKey(Phaser.Keyboard.M),
        showDialog: game.input.keyboard.addKey(Phaser.Keyboard.Q),
      };
    }
  }

  _keyPressed(keys) {
    for (const k of keys) {

      if (this.justPressed) {
        if (k.justPressed())
          return true;
      } else {
        if (k.isDown)
          return true;
      }

    }
    return false;
  }

  _padPressed(button) {
    if (this.justPressed) {
      return this.pad1.justPressed(button, 25);
    }

    return this.pad1.isDown(button);
  }

  get up () {
    return (
      this._keyPressed(this.keys.ups) ||
      this._padPressed(Phaser.Gamepad.XBOX360_DPAD_UP) ||
      this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < -stickThreshold
    );
  }

  get down () {
    return (
      this._keyPressed(this.keys.downs) ||
      this._padPressed(Phaser.Gamepad.XBOX360_DPAD_DOWN) ||
      this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) > stickThreshold
    );
  }

  get left () {
    return (
      this._keyPressed(this.keys.lefts) ||
      this._padPressed(Phaser.Gamepad.XBOX360_DPAD_LEFT) ||
      this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -stickThreshold
    );
  }

  get right () {
    return (
      this._keyPressed(this.keys.rights) ||
      this._padPressed(Phaser.Gamepad.XBOX360_DPAD_RIGHT) ||
      this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > stickThreshold
    );
  }

  get punch () {
    return (
      this._keyPressed(this.keys.punches) ||
      this._padPressed(Phaser.Gamepad.XBOX360_X)
    );
  }

  get kick () {
    return (
      this._keyPressed(this.keys.kicks) ||
      this._padPressed(Phaser.Gamepad.XBOX360_A)
    );
  }

  get jump () {
    return false;
    // return (
    //   this._keyPressed(this.keys.jumps) ||
    //   this._padPressed(Phaser.Gamepad.XBOX360_A)
    // );
  }

  // DEBUG

  debug(what) {
    return this.keys[what].justPressed();
  }

}

export default Controls;
