import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { AppDataSource } from './datasource';
import { User } from './entities/User';

export const initializePassport = () => {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        callbackURL: '/api/auth/google/callback',
    }, async (accessToken, refreshToken, profile, done) => {
        const userRepository = AppDataSource.getRepository(User);
        let user = await userRepository.findOne({ where: { googleId: profile.id } });
        console.log("profile",profile);
        
        if (!user) {
            user = userRepository.create({
                name: profile.displayName,
                email: profile?.emails?.[0].value,
                googleId: profile.id,
            });
            await userRepository.save(user);
        }
        return done(null, user);
    }));

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user: any, done) => {
        done(null, user);
    });
};