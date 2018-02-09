import React from 'react';
import ReactDOM from 'react-dom/server';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';
import { Provider } from 'react-redux';

import configureStore from '../shared/core/configure-store';
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
    const preloadedState = {
        todos: [{
            id: 1,
            name: 'Walk the dog'
        }, {
            id: 2,
            name: 'Buy butter from the store'
        }]
    };
    const store = configureStore(preloadedState);

    const app = (
        <Provider store={store}>
            <App/>
        </Provider>
    );

    const appString = ReactDOM.renderToString(app);
    const chunkNames = flushChunkNames();
    const { js, styles, cssHash } = flushChunks(clientStats, { chunkNames });

    res.render('index', {
        appString,
        js,
        styles,
        cssHash,
        preloadedState: JSON.stringify(preloadedState)
    });
};
