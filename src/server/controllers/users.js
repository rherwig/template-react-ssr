/**
 * This is an example controller that shows how routing works in an express api.
 * In a real-world app, you would use database queries here to retrieve data instead
 * of using a hardcoded object.
 */
const users = [{
    id: 1,
    name: 'admin',
}, {
    id: 2,
    name: 'developer'
}];

/**
 * This example route features an async response, like a real database request would do.
 * The async behaviour is demonstrated using a timeout.
 *
 * @returns {Promise<any>} Array of users
 */
export const getAll = () => new Promise(resolve => {
    return setTimeout(() => {
        return resolve(users);
    }, 1000);
});

export const getById = (id) => users.find(user => user.id === id);
