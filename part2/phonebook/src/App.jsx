import { useEffect, useState } from 'react'
import personsService from './services/persons'
const Search = (props) => {
  return (
  <div>
    <input /*plain input is form without submit (i.e re-render) ability*/
      placeholder='search for people...'
      value={props.searchBar}
      onChange={props.handleSearchBar}
    />
  </div>
  )
}

const AddNewPerson = ({addInfo, newName, handleNameChange, newNum, handleNumChange}) => {
  return (
    <form onSubmit={addInfo}>
        <div>
          <input
            value={newName}
            onChange={handleNameChange}
            placeholder='insert name'
          />
        </div>
        <div>
          <input
            value={newNum}
            onChange={handleNumChange}
            placeholder='insert phonenumber'
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Numbers = ({filteredPersons, deletePerson}) => {
  return (
    filteredPersons.map(person => 
    <Person 
      key={person.id}
      id={person.id}
      name={person.name} 
      number={person.number} 
      deletePerson={deletePerson}>
    </Person>)
  )
}

const Person = ({name, number, id, deletePerson}) =>
  <p>{name} {number} <button onClick={() => deletePerson(id)}>delete</button></p> /* arrow func so delete doesnt get called on render */



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [searchBar, setSearchBar] = useState('')


  useEffect(() => {
    personsService
        .getAll()
        .then(response => {
          setPersons(response)
        })
  }, [])


  const addInfo = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNum,
    }

    const addReplace = () => {
      const confirmation = window.confirm(`The name ${newName} is already added to phonebook, replace the old number with a new one?`)
      if (confirmation) {
          const currentPerson = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
          const updatedPerson = { ...currentPerson, number: newNum}
          personsService
            .replacePerson(currentPerson.id, updatedPerson)
            .then(() => {
              setPersons(persons.map(person => person.id === currentPerson.id ? updatedPerson : person))
              setNewName('')
              setNewNum('')
            })
      }
    }

    const addSuccess = () => {
      personsService
          .newPerson(personObject)
          .then(response => {
            setPersons(persons.concat(response))
            setNewName('')
            setNewNum('')
          })
    }

    persons.some(person => person.name.toLowerCase() === newName.toLowerCase()) /* some runs test against each element */
      ? addReplace()
      : addSuccess()
  }

  const deletePerson = (id) => {
    const currentPerson = persons.find(person => person.id === id)
    const confrimation = () => window.confirm(`Are you sure you want to delete ${currentPerson.name}?`)
    if (confrimation()) {
      personsService
        .delPerson(id)
        .then(() =>
          setPersons(persons.filter(person => person.id !== id))
      )
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumChange = (event) => {
    setNewNum(event.target.value)
  }

  const handleSearchBar = (event) => {
    setSearchBar(event.target.value)
  }

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(searchBar.toLowerCase()))

  return (
    <div>

      <h2>Phonebook</h2>

      <Search 
      searchBar={searchBar}
      handleSearchBar={handleSearchBar}
      />

      <AddNewPerson 
      addInfo={addInfo}
      newName={newName}
      newNum={newNum}
      handleNameChange={handleNameChange}
      handleNumChange={handleNumChange}
      />

      <h2>Numbers</h2>

      <Numbers filteredPersons={filteredPersons} deletePerson={deletePerson}/>
        
    </div>
  )
}

export default App
