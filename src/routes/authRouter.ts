import { Router } from "express";

const authRoute = Router()

authRoute.post('/login', (req, res) => {
    res.send('login')
})
authRoute.post('/signup', (req, res) => {
    res.send('signup')
})

export default authRoute