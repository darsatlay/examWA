import express from "express";
import passport from "passport";

import crypto from "crypto";

import {
    getUserByUsername,
    createUser
} from "../dao/user-dao.js";

const router = express.Router();


// Register

router.post("/register", async (req, res) => {

    try {
        const {
            username,password
        } = req.body;
        if (!username || !password) {
            return res.status(400).json({
                error: "Username and password required"
            });
        }

        const existing = await getUserByUsername(username);
        if (existing) {
            return res.status(409).json({
                error: "User already exists"
            });

        }

        const salt = crypto.randomBytes(16).toString("hex");
        crypto.scrypt(
            password,
            salt,
            32,
            async (err, hashedPassword) => {
                if (err) {
                    return res.status(500).json({
                        error: err.message
                    });
                }

                try {
                    await createUser(
                        username,
                        hashedPassword.toString("hex"),
                        salt
                    );

                    res.status(201).json({
                        message: "User created"
                    });

                }
                catch (err) {
                    res.status(500).json({
                        error: err.message
                    });

                }

            }

        );

    }
    catch (err) {
        res.status(500).json({
            error: err.message
        });

    }

});


// Login


router.post(
    "/",
    passport.authenticate("local"),
    (req, res) => {
        res.json(req.user);
    }

);


// Current user

router.get("/current", (req, res) => {
    if (req.isAuthenticated()) {
        return res.json(req.user);
    }

    res.status(401).json({
        error: "Not authenticated"
    });

});


// Logout

router.delete("/current", (req, res) => {
    req.logout(err => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        req.session.destroy(() => {
            res.clearCookie("connect.sid");
            res.sendStatus(204);
        });
    });

});
export default router;