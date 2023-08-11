const form = document.querySelector('form')
const nameInput = document.querySelector('[name="name"]')
const ageInput = document.querySelector('[name="age"]')
const typeInput = document.querySelector('[name="type"]')

const handleSubmit = e => {
  e.preventDefault()
  
  const newPet = {
    name: nameInput.value,
    age: ageInput.value,
    type: typeInput.value,
  }

  fetch('/api/create-pet', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newPet)
  })
    .then(response => {
      if (response.status === 201) {
        window.location.assign('/')
      }
    })
    .catch(err => console.log(err))
}

form.addEventListener('submit', handleSubmit)