const express = require('express')
const app = express()

// Loading our routers
const mainRouter = require('./mainRoutes.js')
const classRouter = require('./routes/classRoutes.js')

// Tell Express to use built-in bodyParser for JSON and URL encoded form bodies
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Mounting our routers
app.use('/', mainRouter)
app.use('/class', classRouter)

app.listen(3000, () => {
  console.log('Express server running on port 3000')
})
