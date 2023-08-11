const { readFile, writeFile } = require('fs/promises')
const path = require('path')
const express = require('express')
const app = express()
const PORT = 3000
const pets = require('./data/pets.json')
const { generateId } = require('./utils/generateId')

// allows the browser to request ANYTHING out of the public folder
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const dataPath = path.join(__dirname, 'data', 'pets.json')

// Page Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'))
})

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contact.html'))
})

// API Routes
app.get('/api/all-pets', (req, res) => {
  res.json(pets)
})

app.get('/api/search-pets', (req, res) => {
  const searchedName = req.query.name
  const results = pets.filter(pet => pet.name === searchedName)
  res.json(results)
})

app.post('/api/create-pet', async (req, res) => {

  if (!req.body || !req.body.name || !req.body.age || !req.body.type) {
    return res.status(400).json('We need a name, age, and type')
  }

  // read and parse the file contens
  const content = await readFile(dataPath, 'utf-8')
  const pets = JSON.parse(content)

  // add new data to the array
  const newPet = {
    ...req.body,
    id: generateId()
  }

  pets.push(newPet)
  
  // save file
  await writeFile(dataPath, JSON.stringify(pets, null, 2))

  res.status(201).json(newPet)
})

app.listen(PORT, () => {
  console.log(`Express listening on http://localhost:${PORT}`)
})