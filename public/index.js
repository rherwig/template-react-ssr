'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _fs = require('fs');

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

var _winston = require('winston');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Configures hot reloading and assets paths for local development environment.
 * Use the `npm start` command to start the local development server.
 *
 * @param app Express app
 */
var configureDevelopment = function configureDevelopment(app) {
    var clientConfig = require('../webpack/client');
    var serverConfig = require('../webpack/server');
    var publicPath = clientConfig.output.publicPath;
    var outputPath = clientConfig.output.path;

    var multiCompiler = require('webpack')([clientConfig, serverConfig]);
    var clientCompiler = multiCompiler.compilers[0];

    app.use(require('webpack-dev-middleware')(multiCompiler, { publicPath: publicPath }));
    app.use(require('webpack-hot-middleware')(clientCompiler));

    app.use(publicPath, _express2.default.static(outputPath));

    app.use(require('webpack-hot-server-middleware')(multiCompiler, {
        serverRendererOptions: { outputPath: outputPath }
    }));
};

/**
 * Configures assets paths for production environment.
 * This environment is used in deployment and inside the docker container.
 * Use the `npm run build` command to create a production build.
 *
 * @param app Express app
 */
var configureProduction = function configureProduction(app) {
    var clientStats = require('./assets/stats.json');
    var serverRender = require('./assets/app.server.js').default;
    var publicPath = '/';
    var outputPath = (0, _path.join)(__dirname, 'assets');

    app.use(publicPath, _express2.default.static(outputPath));
    app.use(serverRender({
        clientStats: clientStats,
        outputPath: outputPath
    }));
};

var app = (0, _express2.default)();

(0, _winston.log)('info', 'Configuring server for environment: ' + process.env.NODE_ENV + '...');
if (process.env.NODE_ENV === 'development') {
    configureDevelopment(app);
} else {
    configureProduction(app);
}

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function () {
    return (0, _winston.log)('info', 'Server listening on port ' + app.get('port') + '...');
});
