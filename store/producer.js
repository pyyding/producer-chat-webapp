import fb from '~/plugins/firebase'
import { COLLECTIONS, POST_TYPES } from '~/utils/constants.js'
import Post from '~/models/post.js'
import moment from 'moment'

export const state = () => ({
    producer: null,
    posts: []
})

export const mutations = {
    setPosts(state, posts) {
        state.posts = posts
    },
    setProducer(state, producer) {
        state.producer = producer
    }
}

export const actions = {
    async fetchProducerById({ commit }, id) {
        const snapshot = await fb.db
            .collection('users')
            .doc(id)
            .get()
        const producer = snapshot.data()
        producer.id = snapshot.id

        producer.photoURLLarge = producer.photoURL.slice(0, -6) + '512.png'
        commit('setProducer', producer)
        return producer
    },
    async fetchProducer({ commit, dispatch }, slug) {
        try {
            const snapshot = await fb.db
                .collection('users')
                .where('slug', '==', slug)
                .get()
            const doc = snapshot.docs[0]
            if (!doc) return dispatch('fetchProducerById', slug)
            const producer = snapshot.docs[0].data()
            producer.id = snapshot.docs[0].id

            producer.photoURLLarge = producer.photoURL.slice(0, -6) + '512.png'
            commit('setProducer', producer)
            return producer
        } catch (e) {
            console.error(e)
        }
    },
    async fetchPosts({ commit }, id) {
        const posts = []

        const tasksSnapshot = await fb.db
            .collection(COLLECTIONS.TASKS)
            .where('isDone', '==', true)
            .where('user.id', '==', id)
            .orderBy('createdAt', 'desc')
            .limit(30)
            .get()

        for (const doc of tasksSnapshot.docs) {
            const task = doc.data()
            const taskDate = task.createdAt.toDate().getDate()
            const match = posts.find(post => {
                const postDate = post.createdAt.toDate().getDate()
                return post.user.id === task.user.id && postDate === taskDate
            })
            if (match) {
                match.data.push(task)
            } else {
                const dateMoment = moment(task.createdAt.toDate())
                const dateString = dateMoment.fromNow()

                const post = new Post(
                    [task],
                    POST_TYPES.TASK,
                    task.createdAt,
                    task.user,
                    dateString
                )
                posts.push(post)
            }
        }

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
    async edit({ dispatch }, { id, data }) {
        const userRef = fb.db.collection('users').doc(id)
        await userRef.update(data)
        dispatch('fetchProducerById', id)
    }
}

export const getters = {
    producer(state) {
        return state.producer
    },
    posts(state) {
        return state.posts
    }
}
