import fb from '~/plugins/firebase'
import { COLLECTIONS, POST_TYPES } from '~/utils/constants.js'
import moment from 'moment'
import Post from '~/models/post.js'

export const state = () => ({
    posts: []
})

export const mutations = {
    setPosts(state, posts) {
        state.posts = posts
    }
}

export const actions = {
    async fetchPosts({ commit }) {
        const posts = []
        const tracksSnapshot = await fb.db
            .collection(COLLECTIONS.TRACKS)
            .orderBy('createdAt', 'desc')
            .limit(10)
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
    }
}

export const getters = {
    posts(state) {
        return state.posts
    }
}
