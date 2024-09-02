import mongoose from "mongoose";
import { genSalt, hash } from "bcrypt";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required."],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required."],
    },
    firstName: {
        type: String,
        required: false,
    },
    lastName: { // Changed 'lastname' to 'lastName' for consistency
        type: String,
        required: false,
    },
    image: {
        type: String,
        required: false,
    },
    color: {
        type: Number,
        required: false,
    },
    profileSetup: {
        type: Boolean,
        default: false,
    }
});

// Middleware to hash the password before saving the user
UserSchema.pre("save", async function(next) {
    if (this.isModified("password") || this.isNew) {
        const salt = await genSalt();
        this.password = await hash(this.password, salt);
    }
    next();
});

const User = mongoose.model("User", UserSchema);

export default User;
