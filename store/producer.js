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
		const snapshot = await fb.db.collection('users').where('slug', '==', slug).get()
		if (snapshot.docs.length > 0) {
			const producer = snapshot.docs[0].data()
			commit('setProducer', producer)
		} else {
			// @TODO handle producer not found
		}
	}
}

export const getters = {
	producer (state) {
		return state.producer
	}
}
