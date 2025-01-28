import { Request, Response, Router } from "express";
import { AppDataSource } from "../datasource";
import jwt from "jsonwebtoken";
import { User } from "../entities/User";
import bcrypt from 'bcrypt';
import passport from "passport";
import { createUser, getUser, getUserDetails } from "../utils/dbHelper";
import { validateLoginInput, validateSignupInput } from "../utils/validators";

const authRoute = Router()

authRoute.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));
authRoute.get('/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: '/' }),
    async (req: any, res: any) => {
        const user = req.user as any;
        if (!user) return res.status(401).json({ message: "Authentication failed" });
        const token = jwt.sign({ id: user.email }, process.env.JWT_SECRET!, { expiresIn: "7h" });
        res.status(200).json({ message: "Google login successful", token });
    }
);
authRoute.post('/login', async (req: any, res: any) => {
    const { email, password } = req.body;
    try {
        const { error } = validateLoginInput({ email, password });
        if (error) return res.status(400).json({ isSuccess: false, message: error });

        const user = await getUser(email)
        if (!user) return res.status(401).json({ isSuccess: false, message: 'Invalid credentials.' });

        const isMatch = await bcrypt.compare(password, user?.password || "");
        if (!isMatch) return res.status(401).json({ isSuccess: false, message: 'Invalid email or password' });

        const token = jwt.sign({ id: user?.email }, process.env.JWT_SECRET!, { expiresIn: "7h" });
        res.status(200).json({ message: "Logged in", token });
    }
    catch (error: any) {
        console.error('Error authenticating user:', error);
        res.status(error.status || 500).json({ isSuccess: false, error: error.message || error || 'Internal server error.' });
    }
})
authRoute.post('/signup', async (req: any, res: any) => {
    const { username, password, email } = req.body;
    try {
        const { error } = validateSignupInput({ username, password, email });
        if (error) return res.status(400).json({ message: error });
        let user = await getUser(email)
        if (user) return res.status(400).json({ message: 'User already exists.' })
        const hashedPassword = await bcrypt.hash(password, 10);
        await createUser(email, username, "", hashedPassword)
        res.status(201).json({ message: 'User successfully registered.' });
    }
    catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ isSuccess: false, message: 'Internal server error.' }).end();
    }
})

export default authRoute