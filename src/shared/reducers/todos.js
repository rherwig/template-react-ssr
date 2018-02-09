import { ADD_TODO } from '../actions/todos';

/**
 * This example reducer handle the creation of todo items.
 * For more information on how reducers work, see https://redux.js.org/docs/basics/Reducers.html.
 * @param state Initial state of the reducer
 * @param action Action that comes in via the dispatcher
 * @returns {*} New state
 */
export default (state = [], action) => {
    switch (action.type) {
        case ADD_TODO:
            return state.concat({
                id: state.length + 1,
                name: action.payload.name
            });
        default:
            return state;
    }
};
