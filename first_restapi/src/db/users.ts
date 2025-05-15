import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {type : String, required :true},
    email : {type : String, required :true},
    authentication : {
        password :{type : String, required : true ,select : false},
        salt : {type : String,select : false},
        sessionToken : {type : String,select : false},
    }
})

export const userModel = mongoose.model('User', userSchema);
export const getUsers = () => {userModel.find()};
export const getUserByEmail = (email : String) : any => { return userModel.findOne({email})};
export const getUserBySessionToken = (sessionToken : String) => { return userModel.find({'authentication.sessionToken' : sessionToken})};
export const getUserById = (id : String) => {userModel.findById({id})};

export const createUser = (values : Record<string , any>) => new userModel(values).save().then((user) => user.toObject());
export const deleteUser = (id : String) => userModel.findByIdAndDelete({_id : id});
export const updateUser = (id : string, values : Record<string , any>) => userModel.findByIdAndUpdate(id , values);