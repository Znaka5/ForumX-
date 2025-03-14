//third-party
import { Router } from "express"
//local
import Disasters from "../models/boards.js"

const home = Router()

home.get("/", async function (req, res) {
    const disasters = await Disasters.find({}).sort({ createdAt: -1 }).limit(3)
    res.render("home", { disasters, tittle: "Home Page" })
})

export default home