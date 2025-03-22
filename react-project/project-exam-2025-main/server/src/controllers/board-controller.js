//third-party
import { Router } from "express"
import { Types } from "mongoose"
//local
import Boards from "../models/boards.js"
import Comment from "../models/comments.js"

const boardController = Router()

boardController.get("/board", async function (req, res) {
    const boards = await Boards.find({}).lean()

    res.json({ message: boards })
})

boardController.get("/comments", async function (req, res) {
    const comments = await Comment.find({}).lean()

    res.json({ message: comments })
})

boardController.post("/comments", async function (req, res) {
    let userData = req.body

    userData.post_id = new Types.ObjectId(userData.post_id)

    try {
        const data = await Comment.create(userData)
        let board = await Boards.findOne({ _id: userData.post_id })

        board.comments.push(userData)

        await Boards.updateOne({ _id: userData.post_id }, board)

        res.json({ satus: 200, recievedData: data })
    } catch (err) {
        res.json({ status: 400, recievedData: "error" })
    }
})

boardController.get("/:id/comments", async function (req, res) {
    const id = new Types.ObjectId(req.params.id)
    const comments = await Comment.find({ post_id: id }).lean()

    res.json({ message: comments })
})


boardController.get("/:id/details", async function (req, res) {
    const id = req.params.id
    const board = await Boards.findOne({ _id: id })

    res.json({ message: board })
})

boardController.get("/random/:id", async function (req, res) {
    const id = req.params.id
    const board = await Boards.findOne({ _id: id })

    res.json({ message: board })
})

boardController.get("/:id/:user_id/upvoted", async function (req, res) {
    const id = req.params.id
    const userId = new Types.ObjectId(req.params.user_id)
    let board = await Boards.findOne({ _id: id })
    board.upvotes = `${Number(board.upvotes) + 1}`
    board.upvoted.push(userId)

    try {
        await Boards.updateOne({ _id: board._id }, board)

        res.json({ satus: 200, recievedData: board })
    } catch (err) {
        res.json({ status: 400, recievedData: "error" })
    }
})

boardController.get("/:id/delete", async function (req, res) {
    const id = req.params.id
    const board = await Boards.findOne({ _id: id })

    try {
        const res = await Comment.deleteMany({ post_id: board._id })

        await Boards.deleteOne({ _id: board._id }, board)

        res.json({ status: 200, data: res })
    } catch (err) {

        res.json({ status: 400 })
    }
})

boardController.post("/:id/edit", async function (req, res) {
    const id = req.params.id
    let boardData = req.body

    if (boardData.title === "") {
        return res.json({ statu: 400, recievedData: "error", message: "title must be filled" })
    }

    try {
        await Boards.updateOne({ _id: id }, boardData)

        res.json({ statu: 201 })
    } catch (err) {
        res.json({ statu: 400, recievedData: "error", message: "error updating" })
    }
})

// //and this
// boardController.post("/search", async function (req, res) {
//     const query = req.body
//     let disaster

//     if (query.name === "") {
//         disaster = await Disasters.find({ type: { $regex: new RegExp(query.type, "i") } }).lean()

//         res.render("search", { disaster, title: "Search" })
//         return;
//     }

//     disaster = await Disasters.find({ name: { $regex: new RegExp(query.name, "i") }, type: { $regex: new RegExp(query.type, "i") } }).lean()

//     if (disaster.length < 1) {
//         disaster = await Disasters.find({ name: { $regex: new RegExp(query.name, "i") } })
//     }

//     res.render("search", { disaster, title: "Search" })
// })

export default boardController