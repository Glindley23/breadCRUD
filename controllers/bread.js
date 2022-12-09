const router = require('express').Router()
const Bread = require('../models/bread')


//GET: All the bread
router.get('/', async (req, res) => {
    const bread = await Bread.find()
    res.render('index', {
        breads: bread
    })
})

//GET: create new Bread page
router.get('/new', (req, res) => {
    res.render('new')
})

//GET: edit bread page
router.get('/:index/edit', (req, res) => {
    const { index } = req.params
    const bread = Bread[index]
    res.render('edit', {
        bread,
        index
    })
})

//GET: Bread by index
router.get('/:id', async (req, res) => {
    const { id } = req.params
    const bread = await Bread.findById(id)
    res.render('show', {
        bread
        
    })
})


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

router.delete('/:index', (req, res) => {
    const { index } = req.params    
    Bread.splice(index, 1)
    res.status(303).redirect('/breads')
})

//PUT: Updating a bread
router.put('/:index', (req, res) => {
    const { index } = req.params
    const { hasGluten, image } = req.body
    if (!image) { req.body.image = 'https://suebeehomemaker.com/wp-content/uploads/2021/10/sliced-french-bread.jpg' }
    if (hasGluten === 'on') {
        req.body.hasGluten = true
    } else {
        req.body.hasGluten = false
    }
    
    Bread[index] = req.body
    res.redirect(`/breads/${index}`)
})
module.exports = router