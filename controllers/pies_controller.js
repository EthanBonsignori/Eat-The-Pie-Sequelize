const express = require('express')
const router = express.Router()

// Import the model
const Pie = require('../models/Pie')

// Get all
router.get('/', (req, res) => {
  Pie.selectAll(data => {
    const hbsObj = {
      pies: data
    }
    console.log(hbsObj)
    res.render('index', hbsObj)
    // res.json(hbsObj)
  })
})

// Insert new
router.post('/api/pies', (req, res) => {
  console.log(req.body.pie_name)
  Pie.insertOne(['pie_name'], [req.body.pie_name], (result) => {
    res.status(201).json({ id: result.insertId }).end()
  })
})

// Update
router.put('/api/pies/:id', (req, res) => {
  const condition = `id = ${req.params.id}`
  console.log('condition', condition)
  if (!req.body || !req.body.devoured) {
    return res.status(400).end()
  }
  Pie.updateOne({
    devoured: req.body.devoured
  }, condition, (result) => {
    if (result.changedRows === 0) {
      return res.status(404).end()
    } else {
      res.status(200).end()
    }
  })
})

router.delete('/api/pies/:id', (req, res) => {
  const condition = `id = ${req.params.id}`
  console.log('condition', condition)
  Pie.deleteOne(condition, (result) => {
    if (result.affectedRows === 0) {
      return res.status(404).end()
    } else {
      res.status(200).end()
    }
  })
})

module.exports = router
