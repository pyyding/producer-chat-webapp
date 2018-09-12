import fb from '~/plugins/firebase'

export const state = () => ({
	producer: false
})

export const mutations = {
	setProducer (state, producer) {
		state.producer = producer
	}
}

export const actions = {
	async getProducer ({ commit }, slug) {
		const snapshot = await fb.db.collection('users').doc(slug).get()
		commit('setProducer', snapshot.data())
	}
}

export const getters = {
	producer (state) {
		return state.producer
	}
}
