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
        const tasksSnapshot = await fb.db
            .collection(COLLECTIONS.TASKS)
            .where('isDone', '==', true)
            .orderBy('createdAt', 'desc')
            .limit(30)
            .get()

        for (const doc of tasksSnapshot.docs) {
            const task = doc.data()
            task.id = doc.id
            task.text = task.text || 'checked in'
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
