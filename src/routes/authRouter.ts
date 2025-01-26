import { Request, Response, Router } from "express";
import { AppDataSource } from "../datasource";
import jwt from "jsonwebtoken";
import { User } from "../entities/User";
import bcrypt from 'bcrypt';
import passport from "passport";
import { log } from "util";

const authRoute = Router()

authRoute.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const userRepository = AppDataSource.getRepository(User);
        let user: any = await userRepository.findOneBy({ email });
        
        if (!user) {
            res.status(401).json({ message: 'Invalid credentials.' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: "7h" });

        res.status(200).json({ message: "Logged in", token });
    }
    catch (error) {
        console.error('Error authenticating user:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
})
authRoute.post('/signup', async (req: Request, res: Response) => {
    const { username, password, email } = req.body;
    try {
        const userRepository = AppDataSource.getRepository(User);
        let user = await userRepository.findOneBy({ email });                                
        if (user) {
            res.status(400).json({ message: 'User already exists.' }).end();
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        user = userRepository.create({
            name: username,
            email,
            password: hashedPassword,
        });
        await userRepository.save(user);
        res.status(201).json({ message: 'User successfully registered.' });
    }
    catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error.' }).end();
    }
})
authRoute.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));
authRoute.get('/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: '/' }),
    (req, res) => {
        const user = req.user as any;

        if (!user) {
            res.status(401).json({ message: "Authentication failed" });
        }

        const token = jwt.sign({ id: user.email }, process.env.JWT_SECRET!, { expiresIn: "7h" });
        res.status(200).json({ message: "Google login successful", token });
    }
);

export default authRoute