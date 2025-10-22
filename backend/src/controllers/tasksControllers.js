import Task from "../models/Task.js";
import asyncHandler from 'express-async-handler'

export const getAllTasks = asyncHandler(async (req, res) => {
    const tasks = await Task.find()

    if(!tasks)
    {
        res.status(500)
        throw new Error("Không tìm thấy task")
    }
    res.status(200).json(tasks)
})

export const createTask = asyncHandler(async (req, res) => {
    const { title } = req.body

    if(!title)
    {
        res.status(400)
        throw new Error('Vui lòng thêm tiêu đề!')
    }

    const createTask = await Task.create({title})
    if(!createTask)
    {
        throw new Error("Lỗi tạo mới task")
    }
    
    res.status(200).json(createTask)
})

export const updateTask = asyncHandler(async (req, res) => {
    const { title, status, completedAt } = req.body

    if(!title && !status && !completedAt)
    {
        res.status(400)
        throw new Error('Dữ liệu lỗi!')
    }

    const createTask = await Task.create({title})
    if(!createTask)
    {
        throw new Error("Lỗi tạo mới task")
    }
    
    res.status(200).json(createTask)
})

export const deleteTask = (req, res) => {
    res.status(200).json({message: "success"})
} 