import React from 'react';
import ReactDOM from 'react-dom/server';
import Helmet from 'react-helmet';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';

import createDocument from './document';
import App from '../shared/App';

/**
 * Provides the server side rendered app. In development environment, this method is called by
 * `react-hot-server-middleware`.
 *
 * This method renders the ejs template `public/views/index.ejs`.
 *
 * @param clientStats Parameter passed by hot server middleware
 */
export default ({ clientStats }) => async (req, res) => {
    const app = (
        <App/>
    );

    const helmet = Helmet.renderStatic();
    const chunkNames = flushChunkNames();
    const { js, styles } = flushChunks(clientStats, { chunkNames });
    const { pageStart, appStart, appEnd, pageEnd } = createDocument({
        js,
        styles,
        helmet,
    });

    res.set('Content-Type', 'text/html');
    res.write(`${pageStart}${appStart}`);

    const stream = ReactDOM.renderToNodeStream(app);
    stream.pipe(res, { end: false });

    stream.on('end', () => {
        res.end(`${appEnd}${pageEnd}`);
    });
};
