require('dotenv').config()
const express = require('express')

const breadRoutes = require('./controllers/bread.js')

const app = express()

// MIDDLEWARE - has to sit between app declaration and app.use - dont put below route
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())



app.use('/breads', breadRoutes)


const PORT = process.env.PORT || 8080

app.get('/', (req, res) => {
    res.send("<h1>Hello</h1>")
})

app.listen(PORT, console.log(`listening on port ${PORT}`))