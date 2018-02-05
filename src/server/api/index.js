import express from 'express';
import users from './users';

const router = express.Router();

/**
 * Includes the users routes as a middleware.
 * The users routes will be accessible from /api/users inside the browser.
 */
router.use('/users', users);

export default router;
