const express = require('express');
const router = express.Router();
const zod = require('zod');
const { User } = require('../db');
const { JWT_SECRET } = require('../config');
const jwt = require('jsonwebtoken');
const { authMiddleware } = require('../middleware');

const signupSchema = zod.zod.object({
  userName: zod.zod.string(),
  password: zod.zod.string(),
  firstName: zod.zod.string(),
  lastName: zod.zod.string(),
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
    username: body.username
  })

  if(user._id) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs"
    })
  }

  const dbUser = await User.create(body);
  const token = jwt.sign({
    userId: dbUser._id
  },JWT_SECRET)


  res.status(200).json({
    message: "User Created Successfully",
    token: token
  })

})



const signinSchema = zod.object({
  userName: z.string(),
  password: z.string(),
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
    return
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
  User.update({_id: req.userId}, req.body)

  res.json({
    message: "Updated successfully",
  })
})

module.export = {
  router
}