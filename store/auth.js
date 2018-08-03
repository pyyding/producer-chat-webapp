import firebase from '~/plugins/firebase'
const googleProvider = new firebase.auth.GoogleAuthProvider()

const db = firebase.firestore()
const settings = {/* your settings... */ timestampsInSnapshots: true }
db.settings(settings)

export const state = () => ({
  user: null
})
export const mutations = {
  setUser (state, user) {
    state.user = user
  },
  resetUser (state) {
    state.user = null
  }
}
export const actions = {
  async loginWithGoogle ({ commit }) {
    const signInResponse = await firebase.auth().signInWithPopup(googleProvider)

    const googleUser = signInResponse.user

    const users = db.collection('users')

    const userExistsSnapshot = await users.where('email', '==', googleUser.email).get()
    if (!userExistsSnapshot.empty) {
      userExistsSnapshot.forEach(function (doc) {
        const user = doc.data()
	      user.id = doc.id
        commit('setUser', user)
        return user
      })
    }
  },
  signOut ({ commit }) {
    firebase.auth().signOut()
      .then(() => {
	      commit('resetUser')
      })
  },
  async initUserWithEmail ({ commit }, email) {
	  const users = db.collection('users')
	  const userExistsSnapshot = await users.where('email', '==', email).get()
	  if (!userExistsSnapshot.empty) {
		  userExistsSnapshot.forEach(function (doc) {
			  const user = doc.data()
			  user.id = doc.id
			  commit('setUser', user)
			  return user
		  })
	  }
  }
}

export const getters = {
  user (state) {
    return state.user
  }
}
