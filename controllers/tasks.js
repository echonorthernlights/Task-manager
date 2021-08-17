
const Task = require('../models/tasks')
const asyncWrapper = require('../middleware/async')
const  {createCustomError} = require('../errors/customError')

const getAllTasks = asyncWrapper(async (req, res) => {
        const taskList = await Task.find({});
        res.status(200).json({tasks : taskList})
})

const postTask = asyncWrapper(async (req, res) => {
        const task = await Task.create(req.body)
        res.status(201).json(task)
})

const getTaskByID = asyncWrapper(async (req, res, next) => {
        const {id:taskID} = req.params
        const singleTask = await Task.findOne({_id : taskID})
        if(!singleTask){
                return next(createCustomError(`No task found with id : ${taskID}`, 404))
        }
        res.status(200).json({task : singleTask})   
})

const updateTask = asyncWrapper(async(req, res) => {
        const {id:taskID} = req.params
        const updateTask = await Task.findOneAndUpdate({_id : taskID}, req.body, {
            runValidators: true, new: true
        })
        if(!updateTask) return next(createCustomError(`No task found with id : ${taskID}`, 404))
        res.status(200).json({task : updateTask}) 
})

const deleteTask = asyncWrapper(async (req, res) => {
        const {id:taskID} = req.params
        const singleTask = await Task.findOneAndDelete({_id : taskID})
        if(!singleTask) return next(createCustomError(`No task found with id : ${taskID}`, 404))
        res.status(200).json({task : singleTask}) 
})
module.exports = { getAllTasks, postTask, getTaskByID, updateTask, deleteTask, }
