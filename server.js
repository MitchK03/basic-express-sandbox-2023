const routes = require('./routes')
const express = require('express')
const app = express()
const PORT = 3000



// allows the browser to request ANYTHING out of the public folder
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(routes)

app.listen(PORT, () => {
  console.log(`Express listening on http://localhost:${PORT}`)
})