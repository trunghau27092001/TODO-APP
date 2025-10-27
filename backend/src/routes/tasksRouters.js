import express from 'express'
import { createTask, deleteTask, getAllTasks, updateTask } from '../controllers/tasksControllers.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

// router.route('/').get(protect, getAllTasks).post(createTask)
router.route('/').get(protect,getAllTasks).post(protect,createTask).put(protect,updateTask)
router.route('/:id').delete(protect,deleteTask)

export default router