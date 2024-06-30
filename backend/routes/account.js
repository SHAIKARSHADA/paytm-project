const express = require("express");
const { authMiddleware } = require("../middleware");
const { Account } = require("../db");
const router = express.Router();

router.get("/balance",authMiddleware,async (req, res) => {
  const body = req.body;
  const account = await Account.findOne({
    userId: req.userId
  })

  res.status(200).json({
    balance: account.balance,
  })

})

router.post("/transfer",authMiddleware,async (req, res) => {
  
})



module.export = {
  router,
}