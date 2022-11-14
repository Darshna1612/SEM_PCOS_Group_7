import axios from 'axios'

const proxy = 'http://localhost:3000/'

export function examineUser(data) {
  const url = proxy + 'users/examine/' + data.email
  return axios.post(url, data)
}

export function getExamineHistory(data) {
  const url = proxy + 'users/examine/' + data.email
  return axios.get(url)
}