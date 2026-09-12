import { useState } from 'react'

const Number = ({name}) => <p>{name}</p>


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', id: 1}
  ])
  const [newName, setNewName] = useState('')




  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      id: persons.length+1
    }

    persons.some(person => person.name === newName) /* some runs test against each element */
      ? alert(`${newName} is already added to phonebook`)
      : setPersons(persons.concat(personObject))

    setNewName("")
  }



  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }




  return (
    <div>

      <h2>Phonebook</h2>

      <form onSubmit={addName}>
          <input
            value={newName}
            onChange={handleNameChange}
          />
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
        {persons.map(person => <Number key={person.id} name={person.name}></Number>)}

    </div>
  )
}

export default App
