import api from '~/api'
import { setAuthToken, resetAuthToken } from '~/utils/auth'
import cookies from 'js-cookie'
import firebase from '~/plugins/firebase'
const googleProvider = new firebase.auth.GoogleAuthProvider()

const db = firebase.firestore()
const settings = {/* your settings... */ timestampsInSnapshots: true }
db.settings(settings)

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
  } else {
    // No user is signed in.
  }
})

export const state = () => ({
  user: null
})
export const mutations = {
  set_user (state, user) {
    state.user = user
  },
  reset_user (state) {
    state.user = null
  }
}
export const actions = {
  fetch ({ commit }) {
    const token = cookies.get('x-access-token')
    firebase.auth().onAuthStateChanged(user => {
      console.log('hahha' + user)
      if (user) {
        commit('set_user', user)
      }
      return user
    })
  },
  login ({ commit }, data) {
    return api.auth.login(data)
      .then(response => {
        commit('set_user', response.data.user)
        return response
      })
  },
  async loginWithGoogle ({ commit }) {
    const signInResponse = await firebase.auth().signInWithPopup(googleProvider)

    const googleUser = signInResponse.user

    const users = db.collection('users')

    const userExistsSnapshot = await users.where('email', '==', googleUser.email).get()
    if (!userExistsSnapshot.empty) {
      userExistsSnapshot.forEach(function (doc) {
        commit('set_user', doc.data())
      })
    } else {
      await users.add({
        email: googleUser.email,
        displayName: googleUser.displayName,
        photoURL: googleUser.photoURL
      })
        .catch((error) => console.log(error))
    }
  },
  reset ({ commit }) {
    commit('reset_user')
    resetAuthToken()
    cookies.remove('x-access-token')
    return Promise.resolve()
  }
}
