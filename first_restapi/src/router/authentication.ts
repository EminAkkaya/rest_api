import express from 'express';
import {register,login} from '../controllers/authentication';

export default (router : express.Router) => {
    router.post('/auth/register', async (req: express.Request, res: express.Response) => {
      await register(req, res);
    });
    router.post('/auth/login', async (req: express.Request, res: express.Response) => {
      await login(req, res);
    });
};

