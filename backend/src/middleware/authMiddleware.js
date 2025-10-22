import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'

export const protect = asyncHandler(async (req,res,next) =>{
    try {
        //check header bắt đầu bằng Bearer
        if (!req.headers.authorization?.startsWith('Bearer')) {
            return res.status(401).json({ message: 'Not authorized, no token' })
        }
        
        const token = req.headers.authorization?.split(' ')[1]
        //Decoded token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        //findUser bằng id đã gán trước đó (bằng email cũng được)
        //select('-password') bỏ response password
        req.user = await User.findById(decoded.id).select('-password')
        next()
    } catch (error) {
        return res.status(401).json({ message: 'Not authorized, token failed' })
    }
})
