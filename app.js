const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')
const notFound = require('./middleware/notfound')
const errorHandler = require('./middleware/errorHandler')

require('dotenv').config()


app.use(express.static('./public'))
app.use(express.json())
app.use('/api/v1/tasks', tasks)
app.use(notFound)
app.use(errorHandler)

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, () => {
            console.log(`Server running on port : ${PORT}...`)
        })
    } catch (error) {
        console.log(`Error : ${error} .`)
    }
}
start()

