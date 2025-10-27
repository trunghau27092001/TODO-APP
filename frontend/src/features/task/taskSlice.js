import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import taskService from './taskService'

const initialState = {
    tasksList: {
        tasks: [],
        activeCount:0,
        completeCount: 0
    },
    isSuccess: false,
    isLoading:false,
    isError: false,
    message: ''
}

export const createTask= createAsyncThunk('tasks/create', async(taskData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth?.user?.token
        return await taskService.createTask(taskData,token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const updateTask = createAsyncThunk('tasks/update', async(taskData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth?.user?.token
        return await taskService.updateTask(taskData,token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const getTasks = createAsyncThunk('tasks/getAll', async(query, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth?.user?.token
        return await taskService.getAllTask(query,token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const deleteTask = createAsyncThunk('tasks/delete', async(id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth?.user?.token
        return await taskService.deleteTask(id,token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: { 
        reset: () =>initialState,
        // startEditingTask: (state, action)=>{
        //     const taskEdit = state.tasksList.tasks.find((task)=>task._id === action.payload._id) || null
        //     state.editingTask= taskEdit
        // },
        // cancelEditingTask: (state)=>{
        //     state.editingTask = null
        // }
    },
    extraReducers: (builder) =>{
        builder
        //get
        .addCase(getTasks.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(getTasks.fulfilled, (state, action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.tasksList = action.payload
        })
        .addCase(getTasks.rejected, (state, action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })

        //create
        .addCase(createTask.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(createTask.fulfilled, (state, action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.tasksList.tasks.push(action.payload)
        })
        .addCase(createTask.rejected, (state, action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        
        //update
        .addCase(updateTask.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(updateTask.fulfilled, (state, action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.tasksList.tasks.find((task,index)=>{
                if(task._id === action.payload._id){
                    state.tasksList.tasks[index] = action.payload
                    return true
                }
                return false
            })
        })
        .addCase(updateTask.rejected, (state, action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })

        //delete
        .addCase(deleteTask.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(deleteTask.fulfilled, (state, action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.tasksList.tasks = state.tasksList.tasks.filter((task)=>task._id !== action.payload.id)
            state.message = action.payload?.message
        })
        .addCase(deleteTask.rejected, (state, action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    }
})
//, startEditingTask, cancelEditingTask  
export const { reset} = taskSlice.actions
export default taskSlice.reducer 