import axios from 'axios'

const getAll = () => {
    return axios.get('https://studies.cs.helsinki.fi/restcountries/api/all').then(response => response.data)
}

const getCurrent = (country) => {
    return axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`).then(response => response.data)
}

export default { getAll, getCurrent }