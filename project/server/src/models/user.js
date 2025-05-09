import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt'


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 2
    },
    email: {
        type: String,
        required: true,
        minlength: 10
    },
    password: {
        type: String,
        required: true,
        minlength: 4
    },
    imgUrl: {
        type: String,
    }
})
userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 10)
})
const User = model("users", userSchema)

export default User