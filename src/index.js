import 'pixi';
import 'p2';
import Phaser from 'phaser';

import {
  Bootstrap,
  Preloader,
  MainMenu,
  OptionsAudio,
  Options,
  Credits,
  Loading,
  Intro,
  Act1,
  Act2,
  Act5,
  GameOver
} from './states';

window.onload = function () {
  // aspect ratio - (240/160)= 3:2
  const game = new Phaser.Game(240, 160, Phaser.AUTO, ''); 
  // const game = new Phaser.Game(360, 240, Phaser.AUTO, ''); // experiment

  game.state.add('bootstrap', new Bootstrap(game));
  game.state.add('preload', Preloader);
  game.state.add('mainmenu', MainMenu);
  game.state.add('options', Options);
  game.state.add('options-audio', OptionsAudio);
  game.state.add('credits', Credits);
  game.state.add('loading', Loading);
  game.state.add('intro', Intro);
  game.state.add('act1', Act1);
  game.state.add('act2', Act2);
  game.state.add('act5', Act5);
  game.state.add('gameover', GameOver);

  game.state.start('bootstrap');
};
