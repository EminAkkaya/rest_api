import express from 'express';
import {getUsers, deleteUser} from '../db/users';

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await getUsers();
        
        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.sendStatus(400);
    }
}

export const deleteUserFunk = async (req : express.Request, res: express.Response) => {
    try{
        const {id} = req.params;

        const deletedUser = await deleteUser(id);   

        return res.json(deletedUser)
    } catch (error) {
        console.error(error);
        return res.sendStatus(400);
    }
}