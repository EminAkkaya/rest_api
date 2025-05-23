import express from 'express';
import { getUserByEmail, createUser } from '../db/users';   
import {authentication, random} from '../helpers';

export const login = async(req : express.Request , res : express.Response) => {
    try {
        const {email, password} = req.body;

        if (!email ||!password){
            return res.sendStatus(400);
        }

        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');


        if (!user) {
            return res.sendStatus(400);
        }

        const hashedPassword = authentication(user.authentication.salt, password);

        if (hashedPassword !== user.authentication.password) {
            return res.sendStatus(403);
        }

        const salt = random;
        user.authentication.sessionToken = authentication(salt, user._id.toString());
        
        await user.save();

        res.cookie('EMIN-TOKEN', user.authentication.sessionToken, {domain : 'localhost',path : '/'});

        return res.status(200).json(user).end();

    } catch (error) {
        console.error(error);
        return res.sendStatus(401);
    }
}

export const register = async(req : express.Request , res : express.Response) => {
    try {
        const {username, password, email} = req.body;

        if (!username ||!password ||!email){
            return res.sendStatus(400);
        }

        const existingUser = await getUserByEmail(email);

        if (existingUser != null) {
            return res.sendStatus(400);
        }

        const salt = random;
        const user = await  createUser({
            username,
            email,
            authentication : {
                salt,
                password : authentication(salt, password)
            }    
        });

        return res.status(200).json(user).end();

    } catch (error) {
        console.error(error);
        return res.sendStatus(400)
    }
}