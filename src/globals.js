// globa.js - global game switches and consts

const URLOptions = window.location.search.slice(1).split('&')
  .map((option) => {
    const keyValue = option.split('=');
    return { [keyValue[0]]: [keyValue[1]] }
  });

const Globals = {
  // development
  debug: localStorage.getItem(`debug`),
  debugPhysics: localStorage.getItem(`debugPhysics`),
  showFPS: localStorage.getItem(`showFPS`),
  ...URLOptions, // url options override localSotrage values
}

export default Globals;
