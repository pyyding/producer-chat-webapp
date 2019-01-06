import fb from '~/plugins/firebase'
import { COLLECTIONS, POST_TYPES } from '~/utils/constants.js'
import Post from '~/models/post.js'
import moment from 'moment'

export const state = () => ({
	producer: false,
	posts: []
})

export const mutations = {
	setPosts(state, posts) {
		state.posts = posts
	},
	setProducer (state, producer) {
		state.producer = producer
	}
}

export const actions = {
	async fetchProducer ({ commit }, id) {
		// @TODO create user slugs trigger
		const snapshot = await fb.db.collection('users').doc(id).get()
		const producer = snapshot.data()
		producer.id = snapshot.id

		producer.photoURLLarge = producer.photoURL.slice(0, -6) + '512.png'
		commit('setProducer', producer)
		return producer
	},
	async fetchPosts ({ commit }, id) {
		const posts = []
		const tracksSnapshot = await fb.db
			.collection(COLLECTIONS.TRACKS)
			.where('user.id', '==', id)
			.orderBy('createdAt', 'desc')
			.get()

		for (const doc of tracksSnapshot.docs) {
			const track = doc.data()
			const dateMoment = moment(track.createdAt.toDate())
			const dateString = dateMoment.fromNow()
			track.id = doc.id
			const post = new Post(
				track,
				POST_TYPES.TRACK,
				track.createdAt,
				track.user,
				dateString
			)
			posts.push(post)
		}

		posts.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds)
		commit('setPosts', posts) 
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
	},
	posts (state) {
		return state.posts
	}
}
