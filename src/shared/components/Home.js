import React, { Component } from 'react';

import { Link } from 'react-router-dom';

export default class Home extends Component {
    render() {
        return (
            <div>
                <h1>Welcome to React Fiber.</h1>
                <ul>
                    <li>
                        <Link to='/about'>About</Link>
                    </li>
                    <li>
                        <Link to='/random-link'>Not Found</Link>
                    </li>
                </ul>
            </div>
        );
    }

}
