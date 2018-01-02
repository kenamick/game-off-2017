// globals.js - global game switches and consts

const checkStringBoolean = (item) => item === `true`;

const URLOptions = {};
window.location.search.slice(1).split('&').map((option) => {
  const keyValue = option.split('=');
  URLOptions[keyValue[0]] = checkStringBoolean(keyValue[1]) || keyValue[1];
});

const Globals = {
  // development
  debug: checkStringBoolean(localStorage.getItem(`debug`)),
  debugPhysics: checkStringBoolean(localStorage.getItem(`debugPhysics`)),
  showFPS: checkStringBoolean(localStorage.getItem(`showFPS`)),
  noSounds: checkStringBoolean(localStorage.getItem(`noSounds`)),
  noMusic: checkStringBoolean(localStorage.getItem(`noMusic`)),
  // maybe add dev-* key to items' names so we can cycle through options
  // list and assign values automatically
  ...URLOptions, // url options override localSotrage values

  bitmapFont: 'standard',

  palette: {
   sky: { hex: '#c4cfa1', rgb: {r: 196, g: 207, b: 161} },
   bricks1: { hex: '#8b956d', rgb: {r: 139, g: 149, b: 109} }, // light
   bricks2: { hex: '#4d533c', rgb: {r: 77, g: 83, b: 60} }, // dark
   background: { hex: '#1f1f1f', rgb: {r: 31, g: 31, b: 31} },
   menuBackground: { hex: '#4d533c', rgb: {r: 31, g: 31, b: 31} }
  },

};

export default Globals;
