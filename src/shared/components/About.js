import React, { Component } from 'react';

import { Link } from 'react-router-dom';

export default class About extends Component {
    render() {
        return (
            <div>
                <h1>About React Fiber.</h1>
                <ul>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <Link to='/random-link'>Not Found</Link>
                    </li>
                </ul>
            </div>
        );
    }

}
