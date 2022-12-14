const router = require('express').Router()
const Bread = require('../models/bread')
const Baker = require('../models/baker')
const seedData = require('../models/seedData')


//GET: All the bread
router.get('/', async (req, res) => {
    const bread = await Bread.find()
    const bakers = await Baker.find()
    res.render('index', {
        breads: bread,
        bakers
    })
})

//GET: create new Bread page
router.get('/new', async (req, res) => {
    const bakers = await Baker.find()
    res.render('new', {
        bakers
    })
})

//GET: edit bread page
router.get('/:id/edit', async (req, res) => {
    const { id } = req.params
    const bread = await Bread.findById(id)
    const bakers = await Baker.find()
    res.render('edit', {
        bread,
        bakers
    })
})

//GET: Bread by index
router.get('/:id', async (req, res) => {
    const { id } = req.params
    const bread = await Bread.findById(id).populate('baker')
    res.render('show', {
        bread
        
    })
})

//GET: Fake data for testing
router.get('/data/seed', async (req, res) => {
    await Bread.insertMany(seedData)
    res.redirect('/breads')
})

//POST
router.post('/', async (req, res) => {
    const { hasGluten, image } = req.body
    if (!image) req.body.image = undefined
    if (hasGluten === 'on') {
        req.body.hasGluten = true
    } else {
        req.body.hasGluten = false
    }
    await Bread.create(req.body)
    res.redirect('/breads')

})

// DELETE: Deletes a bread
router.delete('/:id', async (req, res) => {
    const { id } = req.params    
    await Bread.findByIdAndDelete(id)
    res.status(303).redirect('/breads')
})

//PUT: Updating a bread
router.put('/:id', async (req, res) => {
    const { id } = req.params
    const { hasGluten, image } = req.body
    if (!image) { req.body.image = 'https://suebeehomemaker.com/wp-content/uploads/2021/10/sliced-french-bread.jpg' }
    if (hasGluten === 'on') {
        req.body.hasGluten = true
    } else {
        req.body.hasGluten = false
    }
    
   await Bread.findByIdAndUpdate(id, req.body)
    res.redirect(`/breads/${id}`)
})

module.exports = router