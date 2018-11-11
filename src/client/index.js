import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';

import App from '../shared/App';
import configureStore from '../shared/core/configure-store';

const store = configureStore(window.__PRELOADED_STATE__);
delete window.__PRELOADED_STATE__;

/**
 * Renders a react component into the #react-root div container.
 * Since react 16, the `hydrate` method is used instead of `render` when dealing
 * with server side rendering.
 *
 * @param Component React component that should be rendered
 */
const render = (Component) => {
    hydrate(
        <Provider store={store}>
            <Component />
        </Provider>,
        document.getElementById('react-root')
    );
};

render(App);

/**
 * This script provides hot module reloading in development mode.
 */
if (module.hot && process.env.NODE_ENV === 'development') {
    module.hot.accept('../shared/App', () => {
        const NextApp = require('../shared/App').default;
        render(NextApp);
    });
}
