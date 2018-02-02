import React, { Component } from 'react';

import { Switch, Route } from 'react-router-dom';

import Home from './components/Home';
import About from './components/About';
import NotFound from './components/NotFound';

import './app.styl';

/**
 * The `App` component is the entry point for the react app.
 * It is rendered on the client as well as on the server.
 *
 * This is also the entry point for react router, declare any
 * of your top-level routes here.
 */
export default class App extends Component {

		render() {
				return (
						<Switch>
							<Route exact path='/' component={Home} />
							<Route path='/about' component={About} />
							<Route component={NotFound} />
						</Switch>
				);
		}

}
