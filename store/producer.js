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

		producer.photoURLLarge = producer.photoURL.slice(0, -6) + '512.png'
		commit('setProducer', producer)
		return producer
	},
	async edit ({ dispatch }, {id, data}) {
		const userRef = fb.db.collection('users').doc(id)
		await userRef.update(data)
		dispatch('fetchProducer', id)
	}
}

export const getters = {
	producer (state) {
		return state.producer
	}
}
