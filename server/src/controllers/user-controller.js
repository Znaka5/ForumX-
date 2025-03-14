//third-party
import { Router } from "express"
//local
import authService from "../services/users-auth.js"

const userController = Router()

userController.post("/register", async function (req, res) {
    const userData = req.body
     
    try {
        const token = await authService.register(userData)

        res.json({status: 200, recievedData: token})
    } catch (err) {
        res.json({status: 400, recievedData: "error"})
    }

})

userController.get("/login", function (req, res) {
    res.render("login", { title: "Login Page" })
})

userController.post("/login", async function (req, res) {
    const userData = req.body

    try {
        const token = await authService.login(userData)

        res.json({status: 200, recievedData: token})
    } catch (err) {
        res.json({status: 400, recievedData: "error"})
    }

})

export default userController