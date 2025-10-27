import axios from "axios";

const API_URL = 'http://localhost:8080/api/tasks/'

const createTask = async (goalData, token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, goalData, config)

    return response.data
}

const updateTask = async (goalData, token) =>{
 
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(API_URL, goalData, config)

    return response.data
}

const getAllTask = async (query = '',token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: query ? { filter: query } : {},
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

const deleteTask = async (id, token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + id, config)

    return response.data
}

const taskService = {
    createTask,
    getAllTask,
    deleteTask,
    updateTask
}

export default taskService