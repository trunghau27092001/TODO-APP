import express from 'express'
import dotenv from 'dotenv'
import taskRoute from './routes/tasksRouters.js'
import userRoute from './routes/userRouters.js'
import { connectDB } from './config/db.js'
import { errorHandler } from'./middleware/errorMiddleware.js'
import cors from 'cors'
dotenv.config()
//này để đọc config
const PORT = process.env.PORT || 8080 
const app = express()

app.use(express.json())
app.use(cors({origin:"  "}))

app.use("/api/tasks",taskRoute)
app.use('/api/users',userRoute) 

app.use(errorHandler)
connectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server listen to port ${process.env.PORT}`) 
    }) 
})

