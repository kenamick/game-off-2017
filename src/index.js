import 'pixi';
import 'p2';
import Phaser from 'phaser';

//import './entities/main-character/main-character';
import { Bootstrap, Preloader, MainMenu, GamePlay } from './states';

window.onload = function () {
  // aspect ratio - (240/160)= 3:2
  const game = new Phaser.Game(240, 160, Phaser.AUTO, '');

  game.state.add('bootstrap', new Bootstrap(game));
  game.state.add('preload', Preloader);
  game.state.add('mainmenu', MainMenu);
  game.state.add('play', GamePlay);

  game.state.start('bootstrap');
};
