//third-party
import { Router } from "express"
import { Types } from "mongoose"
//local
import Boards from "../models/boards.js"

const boardController = Router()

boardController.get("/board", async function (req, res) {
    const boards = JSON.stringify(await Boards.find({}).lean())

    res.send(boards)
})

boardController.post("/create", async function (req, res) {
    let userData = req.body
    userData.owner = new Types.ObjectId(req.user.id)
    userData.upvotes = Number(userData.upvotes)
    userData.comments = []
    userData.upvoted = []

    try {Boards.create(userData)

        res.json({status: 201})
    } catch (err) {
        res.json({status: 400, recievedData: "error"})
    }
})

boardController.get("/:id/details", async function (req, res) {
    const id = req.params.id
    const board = await Boards.findOne({ _id: id })

    res.json({message: board})
})

// //this
// boardController.get("/:id/upvoted", recommendCreator, async function (req, res) {
//     const id = req.params.id
//     const userId = new Types.ObjectId(req.user.id)
//     let board = await Boards.findOne({ _id: id })
//     board.upvoted.push(userId)

//     try {
//         await Boards.updateOne({ _id: disaster._id }, disaster)
//     } catch (err) {
//     }
// })

// //do this
// boardController.get("/:id/delete", async function (req, res) {
//     const id = req.params.id
//     const disaster = await Boards.findOne({ _id: id })

//     try {
//         await Boards.deleteOne({ _id: disaster._id }, disaster)
        
//         res.jons({statu: 201})
//     } catch (err) {
//         res.jons({statu: 400})
//     }
// })

// //this too
// boardController.post("/:id/edit", async function (req, res) {
//     const id = req.params.id
//     let boardData = req.body
//     boardData.year = Number(disasterData.year)

//     try {
//         await Boards.updateOne({ _id: id }, boardData, { runValidators: true })
//     } catch (err) {
//     }
// })

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