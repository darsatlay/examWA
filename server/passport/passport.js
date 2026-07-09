import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import crypto from 'crypto';

import {
    getUserByUsername,
    getUserById
} from '../dao/user-dao.js';

passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = await getUserByUsername(username);
            if (!user)
                return done(null, false, {
                    message: 'Incorrect username.'
                });
            crypto.scrypt(
                password,
                user.salt,
                32,
                (err, hashedPassword) => {
                    if (err)
                        return done(err);
                    const passwordMatch =
                        crypto.timingSafeEqual(
                            Buffer.from(user.hash, 'hex'),
                            hashedPassword
                        );
                    if (!passwordMatch)
                        return done(null, false, {
                            message: 'Incorrect password.'
                        });
                    return done(null, {
                        id: user.id,
                        username: user.username
                    });

                });

        }
        catch (err) {
            return done(err);
        }

    }
));


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(
    async (id, done) => {

        try {
            const user =
                await getUserById(id);
            done(null, user);
        }
        catch (err) {
            done(err);
        }

    }
);

export default passport;