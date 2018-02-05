import express from 'express';
import * as usersController from '../controllers/users';

const router = express.Router();

/**
 * This route calls an async method to retrieve users from a fictional database.
 * Since NodeJS 8.0, there is native support for async/await.
 */
router.get('/', async (req, res) => {
    try {
        const users = await usersController.getAll();
        return users.length ? res.status(200).json(users) : res.status(204).end();
    } catch (e) {
        return res.status(500).end(e.message);
    }
});

/**
 * This route shows the use of url parameters to retrieve a single user by its id.
 */
router.get('/:id', (req, res) => {
    const user = usersController.getById(parseInt(req.params.id, 10));
    return user ? res.status(200).json(user) : res.status(204).end();
});

export default router;
