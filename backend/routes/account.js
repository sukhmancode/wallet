const express = require("express")
const { authMiddleware } = require("../middleware/middleware")
const mongoose = require('mongoose')
const { Account } = require("../db/db")

const router = express.Router()

router.get("/balance",authMiddleware,async(req,res,next) => {
    const account = await Account.findOne({
        userId:req.userId
    })
    res.json({
        balance:account.balance
    })
})