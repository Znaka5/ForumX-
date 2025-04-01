import { Schema, model, Types } from "mongoose";

const commentSchema = new Schema({
    message: {
        type: String,
        required: true,
    },
    imgUrl: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        required: true,
    },
    liked: [
        {
            type: Types.ObjectId,
            ref: 'users'
        }
    ],
    owner: {
        type: String,
    },
    post_id: {
        type: Types.ObjectId,
    }
})

const Comment = model("comments", commentSchema)

export default Comment