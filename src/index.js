require('./static/theme.scss');

const { Elm } = require('./Main.elm');
const initSettings = { node: document.getElementById('elm-container') };
const app = Elm.Main.init(initSettings);
