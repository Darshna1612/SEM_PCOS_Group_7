import axios from 'axios'

const proxy = 'http://localhost:3000/'

export function loginUser(data) {
  const url = proxy + 'users/login'
  return axios.post(url, data)
}
export function createUser(data) {
  const url = proxy + 'users/create'
  return axios.post(url, data)
}