import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: [true, "Username already in use"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email already in use"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: String,
    verifyToken: String,
    verifyTokenExpiry: String,
},
{timestamps: true}
)

const User = models.User || model('User', UserSchema);

export default User;