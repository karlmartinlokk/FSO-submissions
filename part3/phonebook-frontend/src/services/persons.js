import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl).then(response => response.data)
}

const newPerson = (newObject) => {
    return axios.post(baseUrl, newObject).then(response => response.data)
}

const replacePerson = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject).then(response => response.data)
}

const delPerson = (id) => {
    return axios.delete(`${baseUrl}/${id}`).then(response => response.data)
}

export default { getAll, newPerson, replacePerson, delPerson }