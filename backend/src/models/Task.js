import mongoose from "mongoose"

const taskSchema = new mongoose.Schema({
    title: {
        type: String, 
        require: true,
        trim: true, 
    },
    status :{
        type: String,
        enum: ['active', 'complete'], 
        default: 'active'
    },
    completedAt:
    {
        type: Date,
        default: null
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'User'
    },
},
{
    timestamps: true, 
})

const Task = mongoose.model('Task', taskSchema);
export default Task