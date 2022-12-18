const router = require('express').Router()
const Baker = require('../models/baker')
const bakerSeedData = require('../models/bakerSeedData')

//GET: Fake data for testing
router.get('/data/seed', async (req, res) => { 
    await Baker.insertMany(bakerSeedData)
    res.redirect('/breads')
})

//GET: Get all breads for bakers
router.get('/', async (req, res) => {
    const bakers = await Baker.find().populate('breads')
    res.json(bakers)
})

// GET: get a Baker by its id
router.get('/:id', async (req, res) => {
    const { id } = req.params
    const baker = await Baker.findById(id).populate('breads')

    res.render('bakerShow', {
        baker
    })
})

//DELETE a baker by id
router.delete('/:id', async (req, res) => {
    const { id } = req.params
    await Baker.findByIdAndDelete(id)
    res.status(303).redirect('/breads')
})

module.exports = router