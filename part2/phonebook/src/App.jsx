import { useEffect, useState } from 'react'
import axios from 'axios'

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

const Person = ({name, number}) => <p>{name} {number}</p>

const Numbers = ({filteredPersons}) => {
  return (
    filteredPersons.map(person => <Person key={person.id} name={person.name} number={person.number}></Person>)
  )
}



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [searchBar, setSearchBar] = useState('')


  useEffect(() => {
    axios
        .get('http://localhost:3001/persons')
        .then(personsData => {
          setPersons(personsData.data)
        })
  }, [])


  const addInfo = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNum,
    }

    const Success = () => {
      axios
          .post('http://localhost:3001/persons', personObject)
          .then(response => {
            setPersons(persons.concat(response.data))
            setNewName('')
            setNewNum('')
          })
    }

    persons.some(person => person.name.toLowerCase() === newName.toLowerCase() || person.number === newNum) /* some runs test against each element */
      ? alert(`The name ${newName} or number ${newNum} is already added to phonebook`)
      : Success()


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

      <Numbers filteredPersons={filteredPersons}/>
        
    </div>
  )
}

export default App
