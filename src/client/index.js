import React from 'react';
import { hydrate } from 'react-dom';

import App from '../shared/App';

const render = Component => {
    hydrate(
        <Component/>,
        document.getElementById('react-root')
    );
};

render(App);

if (module.hot && process.env.NODE_ENV === 'development') {
    module.hot.accept('../shared/App', () => {
        const App = require('../shared/App').default;
        render(App);
    });
}
