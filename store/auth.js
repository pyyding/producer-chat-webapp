import fb from '~/plugins/firebase'

export const state = () => ({
    user: null
})
export const mutations = {
    setUser(state, user) {
        state.user = user
    },
    resetUser(state) {
        state.user = null
    }
}

function delay(t, v) {
    return new Promise(function(resolve) {
        setTimeout(resolve.bind(null, v), t)
    })
}

export const actions = {
    loginWithEmail({}, email) {
        const redirectUrl =
            process.env.NODE_ENV === 'development'
                ? 'http://producer.chat:3000/login'
                : 'https://www.producer.chat/login'
        const actionCodeSettings = {
            url: redirectUrl,
            handleCodeInApp: true
        }
        fb.firebase
            .auth()
            .sendSignInLinkToEmail(email, actionCodeSettings)
            .then(() => {
                window.localStorage.setItem('emailForSignIn', email)
            })
            .catch(error => {
                console.error(error)
            })
    },
    loginAnonymously() {
        fb.firebase.auth().signInAnonymously()
    },
    signOut({ commit }) {
        fb.firebase
            .auth()
            .signOut()
            .then(() => {
                commit('resetUser')
            })
    },
    async initUserWithEmail({ commit }, email) {
        const users = fb.db.collection('users')
        let snapshot = await users.where('email', '==', email).get()
        if (snapshot.empty) {
            setTimeout(() => {
                users
                    .where('email', '==', email)
                    .get()
                    .then(secondSnapshot => {
                        const user = buildUser(secondSnapshot.docs[0])
                        if (!user) return
                        commit('setUser', user)
                    })
            }, 5000)
        } else {
            const user = buildUser(snapshot.docs[0])
            commit('setUser', user)
        }
    }
}

function buildUser(doc) {
    if (!doc) throw new Error('no user found')
    const user = doc.data()
    user.id = doc.id
    return user
}

export const getters = {
    user(state) {
        return state.user
    }
}
