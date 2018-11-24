import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import './app.styl';

import UniversalComponent from './components/UniversalComponent';
import { addTodo } from './actions/todos';

/**
 * This method combines the state of the reducers with the props passed to the component.
 * A component that connects to the store is commonly referred to as 'container'.
 * To connect to the store, the '@connect' decorator is used.
 *
 * @param todos
 * @returns {{todos: *}}
 */
const mapStateToProps = ({ todos }) => ({
    todos
});

/**
 * The `App` component is the entry point for the react app.
 * It is rendered on the client as well as on the server.
 *
 * You can start developing your react app here.
 */
@connect(mapStateToProps, {
    addTodo
})
export default class App extends Component {

    handleAddTodoClick = () => {
        this.props.addTodo(`Random Todo #${Math.round(Math.random() * 100)}`);
    };

    render() {
        const { todos } = this.props;
        console.log(todos);
        return (
            <div>
                <Helmet>
                    <title>App Component | React Universal</title>
                </Helmet>

                <UniversalComponent name="getting-started" />
                <h1>Welcome to React Fiber with Redux.</h1>
                <ul>
                    {todos.map(todo =>
                        <li key={todo.id}>{todo.name}</li>
                    )}
                </ul>
                <button onClick={this.handleAddTodoClick}>Add random todo</button>
            </div>
        );
    }
}
