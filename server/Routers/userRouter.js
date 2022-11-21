import express from "express";
import bcrypt from 'bcryptjs'
import User from '../models/userModel.js';
import dotenv from 'dotenv';

const router = express.Router();
dotenv.config();

router.post("/signup", async (req, res)=>{
    try {
        const { fullname, password, confirmPassword, email } = req.body;
        const userExists = await User.findOne({ email });

        if(userExists)
            return res.status(400).json({ message: 'User already exists.'})

        if (password !== confirmPassword)
            return res.status(400).json({ message: 'Passwords not match' })

        const hashedPassword = await bcrypt.hash(password, 10)

        const createdUser = await User.create({
            fullname,
            email,
            password: hashedPassword
        })

        return res.status(201).json({createdUser: createdUser, message: 'OK'});
    } catch (error) {
        console.log(error)
        return res.json({message: error.message})
    }
})

router.post("/signin", async (req,res)=>{
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email})
        if(!user)
            return res.status(400).json({message: "user does not exist"})
        
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if(!isPasswordCorrect)
            return res.status(400).json({message: "Wrong Password"})
        
        return res.status(200).json({ user, message: 'Authentication successful' })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
})

export default router;