import mongoose from "mongoose";

// create user schema
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        requirred: [true, 'Password is required']
    },
    phoneNumber: Number,
},{timestamps: true});

// delete password when response
UserSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

const User = mongoose.model('User', UserSchema);
export default User;