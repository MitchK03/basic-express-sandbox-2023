const router = require('express').Router()
const path = require('path')

// Page Routes
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

router.get('/create-pet', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'create-pet.html'))
})

module.exports = router