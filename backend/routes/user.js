const express = require('express');
const router = express.Router();
const zod = require('zod');
const { User, Account } = require('../db');
const { JWT_SECRET } = require('../config');
const jwt = require('jsonwebtoken');
const { authMiddleware } = require('../middleware');

const signupSchema = zod.object({
  userName: zod.string(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
})

router.post("/signup",async (req, res) => {
  const body = req.body;

  const {success} = signupSchema.safeParse(body);

  if(!success) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs"
    })
  }

  const user = await User.findOne({
    username: req.body.username
  })

  if(user) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs"
    })
  }


  const dbUser = await User.create(req.body);

  await Account.create({
    userId: dbUser._id,
    balance: 1 + Math.random() * 10000
  })

  const token = jwt.sign({
    userId: dbUser._id
  },JWT_SECRET)

   



  res.status(200).json({
    message: "User Created Successfully",
    token: token
  })

})



const signinSchema = zod.object({
  userName: zod.string(),
  password: zod.string(),
})

router.post("/signin",async (req, res) => {
  const body = req.body;
  const { success } = signinSchema.safeParse(body);
  if(!success) {
    res.status(411).json({
      message: "Error while logging in"
    })
  }
  
  const user = await User.findOne({
    userName: body.userName,
    password: body.password
  })

  if(user) {
    const token = jwt.sign({
      userId: user._id
    },JWT_SECRET) 
    return  res.json({
      message: "User created successfully",
      token: token 
    })
  }

  res.status(411).json({
    message: "Error while Logging in"
  })
})

const updateSchema = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
})
router.put("/",authMiddleware,async (req, res) => {
  const body = req.body;
  const {success} = updateSchema.safeParse(body);

  if(!success) {
    res.status(411).json({
      message: "Error while updating information"
    })
  } 
  await User.updateOne({_id: req.userId}, req.body)

  res.json({
    message: "Updated successfully",
  })
})

router.get("/bulk",async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [{
      firstName: {
        "$regex": filter,
      },
        lastName: {
          "$regex": filter,
        }
    }]
  })

  res.json({
    user: users.map(user => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id, 
    }))
  })

})

module.exports = router;