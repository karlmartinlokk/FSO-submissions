import { useState, useEffect } from 'react'
import countriesService from './services/countries'

const Search = ({search, handleSearch}) => {
    return (
        <div>
            <input
                placeholder='Find country...'
                value={search}
                onChange={handleSearch}
            />

        </div>
    )
}

const Countries = ({filteredCountries, setSearch}) => {

    if (filteredCountries.length > 10) {
        return <p>Too many matches, specify another filter</p>
    } 
    else if (filteredCountries.length !== 1) {
        return (
        <div>
            {filteredCountries.map(c => 
            <div key={c.cca2}>
                <p>{c.name.common} <button onClick={() => setSearch(c.name.common.toLowerCase())}>Show</button> </p>
            </div>
            )}
        </div>
        )
    } 
    else if (filteredCountries.length === 1) {
        return <CountryDisplay country={filteredCountries[0]}/>
    }
    else {
        return <p>Not a valid country</p>
    }
}

const CountryDisplay = ({country}) => {
    return (
        <div>
            <h1>{country.name.common}</h1>
            <p> Capital {country.capital}</p>
            <p> Area {country.area} </p>
            <h2> Languages </h2>
            <ul>{Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}</ul>
            <img src={country.flags.png} alt={country.flags.alt} style={{border: '2px solid black'}}/>
        
        </div>
        

    )
}

const App = () => {
    const [currentCountries, setCountries] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        countriesService
            .getAll()
            .then(response => {
                setCountries(response)
                })
            .catch(err => console.log(err))
    }, [])

    const handleSearch = (event) => setSearch(event.target.value)

    const filteredCountries = currentCountries.filter(c => c.name.common.toLowerCase().includes(search.toLowerCase()))

    return (
        <div>
            <Search
                search={search}
                handleSearch={handleSearch}
            />

            <Countries
                filteredCountries={filteredCountries}
                setSearch={setSearch}
            />

        </div>
        
    )
}

export default App