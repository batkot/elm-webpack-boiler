require('./static/theme.scss');

const { Elm } = require('./Main.elm');
const env = require('./environment');

const initSettings = 
    { 
        node: document.getElementById('elm-container'), 
        flags: env
    };
const app = Elm.Main.init(initSettings);
