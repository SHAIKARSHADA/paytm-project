const express = require("express");
const { authMiddleware } = require("../middleware");
const { Account } = require("../db");
const router = express.Router();

router.get("/balance",authMiddleware,async (req, res) => {
  const body = req.body;
  const account = await Account.findOne({
    userId: req.userId
  })

  res.status(200).express.json({
    balance: account.balance,
  })

})

router.post("/transfer",authMiddleware,async (req, res) => {

  const {amount, to} = req.body;

  const account = await Account.findOne({
    userId: req.userId,
  })

  if(account.balance < amount) {
    res.status(400).express.json({
      message: "Insufficient balance",
    })
  }

  const toAccount = await Account.findOne({
    userId: to,
  })

  if(!toAccount) {
    res.status(400).express.json({
      message: "Invalid account",
    })
  }

  await Account.updateOne({
    userId: req.userId
  }, {
    "$inc": {
      balance: -amount,
    }
  })

  await Account.updateOne({
    userId: to,
  }, {
    "$inc": {
      balance: amount,
    }
  })

  res.json({
    message: "Transfer succesful",
  })
})



module.exports = router;