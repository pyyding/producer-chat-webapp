import fb from '~/plugins/firebase'

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

function delay(t, v) {
	return new Promise(function(resolve) {
		setTimeout(resolve.bind(null, v), t)
	})
}

export const actions = {
  async loginWithGoogle ({ dispatch, commit }) {
    const signInResponse = await fb.firebase.auth().signInWithPopup(fb.providers.googleProvider)

    const googleUser = signInResponse.user

    const users = fb.db.collection('users')
    let userExistsSnapshot = await users.where('email', '==', googleUser.email).get()
    if (!userExistsSnapshot.empty) {
    	const doc = userExistsSnapshot[0]
	    const user = doc.data()
	    user.id = doc.id
	    commit('setUser', user)
	    return user
    } else {
    	return delay(1000)
		    .then(() => {
			    return users.where('email', '==', googleUser.email).get()
				    .then((snapshot) => {
					    const doc = snapshot.docs[0]
					    const user = doc.data()
					    user.id = doc.id
					    commit('setUser', user)
					    return user
				    })
		    })
    }
  },
  signOut ({ commit }) {
    fb.firebase.auth().signOut()
      .then(() => {
	      commit('resetUser')
      })
  },
  async initUserWithEmail ({ commit }, email) {
	  const users = fb.db.collection('users')
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
