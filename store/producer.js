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
	async fetchProducer ({ commit }, slug) {
		// @TODO create user slugs trigger
		const snapshot = await fb.db.collection('users').doc(slug).get()
		const producer = snapshot.data()
		producer.id = snapshot.id
		commit('setProducer', producer)
		return producer
	}	
}

export const getters = {
	producer (state) {
		return state.producer
	}
}
