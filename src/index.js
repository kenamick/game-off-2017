import 'pixi';
import 'p2';
import Phaser from 'phaser';

import { 
  Bootstrap, 
  Preloader, 
  MainMenu,
  Act1, 
} from './states';

window.onload = function () {
  // aspect ratio - (240/160)= 3:2
  const game = new Phaser.Game(240, 160, Phaser.AUTO, '');

  game.state.add('bootstrap', new Bootstrap(game));
  game.state.add('preload', Preloader);
  game.state.add('mainmenu', MainMenu);
  game.state.add('play', Act1);

  game.state.start('bootstrap');
};
