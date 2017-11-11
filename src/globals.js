// globa.js - global game switches and consts

const URLOptions = window.location.search.slice(1).split('&')
  .map((option) => {
    const keyValue = option.split('=');
    return { [keyValue[0]]: [keyValue[1]] }
  });

const checkLocalStorageBoolean =
  (item) => localStorage.getItem(item) === `true`;

const Globals = {
  // development
  debug: checkLocalStorageBoolean(`debug`),
  debugPhysics: checkLocalStorageBoolean(`debugPhysics`),
  showFPS: checkLocalStorageBoolean(`showFPS`),
  // maybe add dev-* key to items' names so we can cycle throug
  // list and check values automatically
  ...URLOptions, // url options override localSotrage values
}

export default Globals;
