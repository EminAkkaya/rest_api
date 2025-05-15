import express from 'express';
import { getAllUsers, deleteUserFunk } from '../controllers/users';
import { isAuthenticated } from '../middleware';
import { isOwner } from '../middleware';

export default (router: express.Router) => {
    router.get('/users', async (req: express.Request, res: express.Response) => {
        await getAllUsers(req, res);
    });
    router.delete('/users/:id', async (req: express.Request, res: express.Response) => {
        await deleteUserFunk(req, res);
    });
};

