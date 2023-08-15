const path = require('path')
const { readFile, writeFile } = require('fs/promises')
const pets = require('./data/pets.json')
const dataPath = path.join(__dirname, 'data', 'pets.json')
const { generateId } = require('./utils/generateId')

// API Routes
app.get('/api/all-pets', (req, res) => {
  res.json(pets)
})

// ?name=Ivy Query Parameter
app.get('/api/search-pets', (req, res) => {
  const searchedName = req.query.name
  const results = pets.filter(pet => {
    const formattedSearchedName = searchedName.toLowerCase().trim()
    const formattedPetName = pet.name.toLowerCase().trim()
    return formattedPetName.includes(formattedSearchedName)
  })
  res.json(results)
})

// URL parameter
app.get('/api/pet/:id', (req, res) => {
  const id = parseFloat(req.params.id)
  const foundPet = pets.find(pet => pet.id === id)
  res.json(foundPet)
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