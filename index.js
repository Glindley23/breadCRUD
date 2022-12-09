require('dotenv').config()
const express = require('express')
const methodOverride = require('method-override')
const breadRoutes = require('./controllers/bread.js')
const mongoose = require('mongoose')
const app = express()

// MIDDLEWARE - has to sit between app declaration and app.use - dont put below route
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
app.use(methodOverride('_method'))


app.use('/breads', breadRoutes)

app.get('/', (req, res) => {
    res.send("<h1>Hello</h1>")
})
mongoose.set('strictQuery', true)
// db connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('DB connected'))
    .catch(err => console.error(err));

const PORT = process.env.PORT || 8080


app.listen(PORT, console.log(`listening on port ${PORT}`))