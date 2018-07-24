import { setAuthToken, resetAuthToken } from '~/utils/auth'
import cookie from 'cookie'

export const state = () => ({
  sidebar: false
})

export const mutations = {
  toggleSidebar (state) {
    state.sidebar = !state.sidebar
  }
}

export const actions = {
}
