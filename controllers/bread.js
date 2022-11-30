const router = require('express').Router()
const Bread = require('../models/bread')


//GET: All the bread
router.get('/', (req, res) => {
    res.send(Bread)
})
//GET: Bread by index
router.get('/:index', (req, res) => {
    const { index } = req.params
    res.send(Bread[index])
})

module.exports = router