const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    name:{
        required: [true, 'Must enter a Name !!'],
        maxlength: [20, 'Field can not pass 20 characters'],
        type: String,
        trim: true,

    },completed:Boolean
})

module.exports = mongoose.model('Task', TaskSchema)