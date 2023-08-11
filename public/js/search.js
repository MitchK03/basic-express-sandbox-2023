const form = document.querySelector('form')
const searchInput = document.querySelector('input[type="search"]')
const resultsUl = document.getElementById('results')

const renderResults = results => {
  // clear the results ul
  resultsUl.innerHTML = ''
  // loop thru results
  for (const pet of results) {
    const li = document.createElement('li')
    li.innerHTML = `
      <h2>${pet.name}</h2>
      <p>Age: ${pet.age} | Type: ${pet.type}</p>
    `
    resultsUl.appendChild(li)
  }
}

const handleSearch = e => {
  e.preventDefault()
  const searchedName = searchInput.value
  fetch(`/api/search-pets?name=${searchedName}`)
    .then(response => response.json())
    .then(results => renderResults(results))
}

form.addEventListener('submit', handleSearch)