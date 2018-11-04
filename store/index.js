import fb from '~/plugins/firebase'
import { COLLECTIONS } from '~/utils/constants.js'

export const state = () => ({
    sidebar: false,
    topUsers: []
})

export const mutations = {
    setTopUsers(state, topUsers) {
        state.topUsers = topUsers
    }
}

export const actions = {
    async fetchTopUsers({ commit }) {
        const snapshot = await fb.db
            .collection(COLLECTIONS.USERS)
            .orderBy('streak', 'desc')
            .limit(10)
            .get()
        const users = []

        for (const doc of snapshot.docs) {
            const user = doc.data()
            if (user.totalTracks > 0) {
                users.push(user)
            }
        }
        commit('setTopUsers', users)
    }
}

export const getters = {
    topUsers(state) {
        return state.topUsers
    }
}
