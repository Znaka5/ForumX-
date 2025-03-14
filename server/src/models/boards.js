import { Schema, model, Types } from "mongoose";

const boardSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    upvotes: {
        type: Number,
        required: true,
    },
    comments : [
        {
            type: String,
        }
    ],
    upvoted : [
        {
            type: Types.ObjectId,
            ref: 'User'
        }
    ],
    owner: {
        type: Types.ObjectId,
        ref: 'User'
    }
})

const Boards = model("boards", boardSchema)

export default Boards