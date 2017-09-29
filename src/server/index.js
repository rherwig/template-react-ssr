import React from 'react';
import ReactDOM from 'react-dom/server';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';

import PageStart from './partials/_start.html';
import PageEnd from './partials/_end.html';
import App from '../shared/App';

const getPageStart = (styles) => PageStart.replace(
    '%styles%',
    styles.map(file => `<link rel="preload" href="${file}" as="style" media="screen" onload="this.rel='stylesheet'"/>`)
);

const getPageEnd = (cssHash, js) => PageEnd.replace('%cssHash%', cssHash).replace('%js%', js);

/**\
 * Provides the server side rendered app. In development environment, this method is called by
 * `react-hot-server-middleware`.
 *
 * @param clientStats Parameter passed by hot server middleware
 */
export default ({ clientStats }) => async (req, res, next) => {
    const stream = ReactDOM.renderToNodeStream(<App/>);
    const chunkNames = flushChunkNames();
    const { js, stylesheets, cssHash } = flushChunks(clientStats, { chunkNames });

    res.write(getPageStart(stylesheets));
    res.write('<div id="react-root">');
    stream.pipe(res, { end: false });
    stream.on('end', () => {
        res.write('</div>');
        res.end(getPageEnd(cssHash, js));
    });
};
