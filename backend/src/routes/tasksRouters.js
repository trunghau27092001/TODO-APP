import express from 'express'
import { createTask, deleteTask, getAllTasks, updateTask } from '../controllers/tasksControllers.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').get(protect, getAllTasks).post(createTask)
router.route('/:id').put(updateTask).delete(deleteTask)

export default router