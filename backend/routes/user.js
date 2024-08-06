const express = require("express")
const router = express.Router()
const JWT_SECRET = require('../config')
const jwt = require("jsonwebtoken")


const zod = require("zod")
const { User } = require("../db/db")
const { authMiddleware } = require("../middleware/middleware")

const signupSchema = zod.object({
    username:zod.string(),
    password:zod.string(),
    firstName:zod.string(),
    password:zod.string()
})
router.post("/signup",async(req,res) => {
    const body = req.body;
    const { success } = signupSchema.safeParse(req.body)
    if(!success) {
        return res.json({
            msg:"email already taken / incorrect inputs"
        })
    } 

    const user = User.findOne({
        username:body.username
    })

    if(user._id) {
        res.json({
            msg:"email already taken"
        })
    }
    const dbUser = await User.create(body)
    const token = jwt.sign({
        userId:dbUser._id
    },JWT_SECRET)

    res.json({
        message:"user created",
        token:token
    })
})

const signInbody = zod.object({
    username:zod.string().email(),
    password:zod.string()
})

router.post("/signIn",async(req,res) => {
    const { success } = signInbody.safeParse(req.body)

    if(!success) {
        res.status(411).json({
            message:"email already taken /incorrect" 
        })
    }

    const user = await User.findOne({
        username:req.body.username,
        password:req.body.password
    })
    if (!user) {
        return res.status(411).json({
            message: "Error while logging in"
        });
    }
    const token = jwt.sign({
        userId: user._id
    }, JWT_SECRET);
    res.json({
        token: token
    });
    
    res.status(411).json({
        message: "Error while logging in"
    })

})

const updateBody = zod.object({
    password:zod.string().optional(),
    firstName:zod.string().optional(),
    lastName:zod.string().optional()
})
router.put("/",authMiddleware,async(req,res,next) => {
    const {success} = updateBody.safeParse(req.body)

    if(!success) {
        res.status(411).json({
            msg:"error while updating inputs"
        })
    }
    await User.updateOne(req.body,{
        id:req.userId
    })
    res.json({
        msg:'updated'
    })
})
router.get("/bulk",async(req,res) => {
    const filter = req.query.filter | "";

    const users = await User.find(
        {
            $or:[{
                firstName:{
                    "$regex":filter
                },lastName:{
                    "$regex":filter
                }
            }]
        }
    )
    res.json({
        users: users.map((user) => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    });
    
})
module.exports = router