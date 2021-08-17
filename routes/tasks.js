const express = require('express')
const router = express.Router()
const { getAllTasks, postTask, getTaskByID, updateTask, deleteTask, } = require('../controllers/tasks')

router.route('/').get(getAllTasks).post(postTask)
router.route('/:id').delete(deleteTask).patch(updateTask).get(getTaskByID)

module.exports = router