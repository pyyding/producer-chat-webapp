import axios from 'axios'

export function setAuthToken (token) {
  axios.defaults.headers.common['x-access-token'] = token
}

export function resetAuthToken (token) {
  delete axios.defaults.headers.common['x-access-token']
}
