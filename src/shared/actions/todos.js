export const ADD_TODO = 'ADD_TODO';

/**
 * This method is used to create the ADD_TODO action.
 * It is dispatched to the reducer and handled by it.
 *
 * @param name Name of the todo item
 * @returns {{type: string, payload: {name: *}}} ADD_TODO action
 */
export const addTodo = (name) => ({
    type: ADD_TODO,
    payload: {
        name
    }
});
