import React, { Component } from 'react';

import { Link } from 'react-router-dom';

export default class NotFound extends Component {
    render() {
        return (
            <div>
                <h1>Page Not Found :(</h1>
                <ul>
                    <li>
                        <Link to='/'>Back Home</Link>
                    </li>
                </ul>
            </div>
        );
    }

}
