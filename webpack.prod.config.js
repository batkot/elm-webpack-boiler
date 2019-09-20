const appConfig = require('./app.config');
const path = require('path');

module.exports = {
    entry: appConfig.entryPoint,
    output: {
        path: path.join(__dirname, appConfig.buildPath),
        filename: appConfig.appName
    }
}
