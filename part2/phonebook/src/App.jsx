import { useState } from 'react'

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

const Person = ({name, num}) => <p>{name} {num}</p>

const Numbers = ({filteredPersons}) => {
  return (
    filteredPersons.map(person => <Person key={person.id} name={person.name} num={person.num}></Person>)
  )
}



const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', num: '040-123456', id: 1 },
    { name: 'Ada Lovelace', num: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', num: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', num: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [searchBar, setSearchBar] = useState('')



  const addInfo = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      num: newNum,
      id: persons.length+1
    }

    persons.some(person => person.name.toLowerCase() === newName.toLowerCase() || person.num === newNum) /* some runs test against each element */
      ? alert(`The name ${newName} or number ${newNum} is already added to phonebook`)
      : setPersons(persons.concat(personObject))

    setNewName('')
    setNewNum('')
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
