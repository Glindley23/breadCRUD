require('dotenv').config()
const express = require('express')

const breadRoutes = require('./controllers/bread.js')

const app = express()

const PORT = process.env.PORT || 8080


app.use('/breads', breadRoutes)

app.get('/', (req, res) => {
    res.send("<h1>Hello</h1>")
})

app.listen(PORT, console.log(`listening on port ${PORT}`))