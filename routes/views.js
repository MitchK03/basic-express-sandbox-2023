const path = require('path')

// Page Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.get('/create-pet', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'create-pet.html'))
})