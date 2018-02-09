import { createStore } from 'redux';

import rootReducer from '../reducers';

/**
 * This methods creates a redux store based on the root reducer.
 * It can be enhanced by middleware, like redux-thunk or redux-devtools.
 *
 * For more information on the store, see https://redux.js.org/docs/basics/Store.html
 *
 * @param preloadedState
 * @returns {Store<any>}
 */
export default (preloadedState) => {
    const store = createStore(rootReducer, preloadedState);

    // this piece of code enables hot reload of state with redux
    if (process.env.NODE_ENV === 'development' && module.hot) {
        module.hot.accept('../reducers', () => {
            store.replaceReducer(require('../reducers').default);
        });
    }

    return store;
};
