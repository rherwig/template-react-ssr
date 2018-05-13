import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Universal from 'react-universal-component';

import './app.styl';

const UniversalComponent = Universal(props =>
    import(`./components/${props.name}`)
);

/**
 * The `App` component is the entry point for the react app.
 * It is rendered on the client as well as on the server.
 *
 * You can start developing your react app here.
 */

export default class App extends Component {
    render() {
        return (
            <div>
                <UniversalComponent name="Title" />
                <UniversalComponent name="H1" />
            </div>
        );
    }
}
