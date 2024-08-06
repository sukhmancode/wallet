const express = require("express");
const { authMiddleware } = require("../middleware/middleware");
const mongoose = require("mongoose");
const { Account } = require("../db/db");

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res, next) => {
  try {
    const account = await Account.findOne({
      userId: req.userId,
    });
    res.json({
      balance: account.balance,
    });
  } catch (error) {
    next(error); // Pass error to error-handling middleware
  }
});

router.post("/transfer", authMiddleware, async (req, res, next) => {
  const session = await mongoose.startSession();

  session.startTransaction();
  try {
    const { amount, to } = req.body;

    const account = await Account.findOne({ userId: req.userId }).session(
      session
    );

    if (!account || account.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Insufficient balance",
      });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);
    if (!toAccount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Invalid account",
      });
    }
    await Account.updateOne(
      { userId: req.userId },
      { $inc: { balance: -amount } }
    ).session(session);
    await Account.updateOne(
      { userId: to },
      { $inc: { balance: amount } }
    ).session(session);

    await session.commitTransaction();
    res.json({
      msg: "Transfer successful",
    });
  } catch (error) {
    await session.abortTransaction();
    next(error); // Pass error to error-handling middleware
  } finally {
    session.endSession();
  }
});

module.exports = router;
