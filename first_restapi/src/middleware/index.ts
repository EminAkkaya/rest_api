import express from 'express';
import { get ,merge } from 'lodash';
import { getUserBySessionToken } from '../db/users';


export const isOwner = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try{
        const userId = get(req, 'identity._id');
        const paramId = get(req, 'params.id');

        if (!userId) {
            return res.sendStatus(403);
        }

        if (userId !== paramId) {
            return res.sendStatus(403);
        }

        return next();

    }catch (error) {
        console.error(error);
        return res.sendStatus(401);
    }
}
export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try{
        const sessionToken = req.cookies['EMIN-TOKEN'];
        if (!sessionToken) {
            return res.sendStatus(403);
        }

        const existingUser = await getUserBySessionToken(sessionToken);

        if (!existingUser) {
            return res.sendStatus(403);
        }

        merge(req, {identity : existingUser});
        return next();

    }catch (error) {
        console.error(error);
        return res.sendStatus(401);
    }
}
