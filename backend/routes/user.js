const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Ensure this line is present to load .env file

const JWT_SECRET = process.env.JWT_SECRET;

// Ensure JWT_SECRET is not undefined
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined. Please check your .env file.');
}

const zod = require('zod');
const { User, Account } = require('../db/db');
const { authMiddleware } = require('../middleware/middleware');

const signupSchema = zod.object({
    username: zod.string(),
    lastName: zod.string(),
    firstName: zod.string(),
    password: zod.string()
});

router.post("/signup", async (req, res) => {
    const body = req.body;
    const { success } = signupSchema.safeParse(body);
    if (!success) {
        return res.status(400).json({
            msg: "email already taken / incorrect inputs"
        });
    }

    const existingUser = await User.findOne({ username: body.username });
    if (existingUser) {
        return res.status(400).json({
            msg: "email already taken"
        });
    }

    try {
        const newUser = await User.create({
            username: body.username,
            password: body.password,
            firstName: body.firstName,
            lastName: body.lastName,
        });

        await Account.create({
            userId: newUser._id,
            balance: 1 + Math.random() * 10000
        });

        const token = jwt.sign({ userId: newUser._id }, JWT_SECRET);
        res.json({
            message: "user created",
            token: token
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

const signInSchema = zod.object({
    username: zod.string().email(),
    password: zod.string()
});

router.post("/signin", async (req, res) => {
    const { success } = signInSchema.safeParse(req.body);
    if (!success) {
        return res.status(400).json({
            message: "email already taken / incorrect"
        });
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (!user) {
        return res.status(400).json({
            message: "Error while logging in"
        });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    res.json({ token: token });
});

const updateSchema = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
});

router.put("/", authMiddleware, async (req, res, next) => {
    const { success } = updateSchema.safeParse(req.body);
    if (!success) {
        return res.status(400).json({
            msg: "error while updating inputs"
        });
    }

    try {
        await User.updateOne({ _id: req.userId }, req.body);
        res.json({ msg: 'updated' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";
    try {
        const users = await User.find({
            $or: [
                { firstName: { $regex: filter, $options: 'i' } },
                { lastName: { $regex: filter, $options: 'i' } }
            ]
        });

        res.json({
            users: users.map(user => ({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            }))
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
