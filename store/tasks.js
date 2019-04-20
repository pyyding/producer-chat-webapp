import fb from '~/plugins/firebase'
import { COLLECTIONS } from '~/utils/constants.js'

export const state = () => ({
    tasks: [],
    loading: false
})

export const mutations = {
    setTasks(state, tasks) {
        state.tasks = tasks
    },
    setStatus(state, task, status) {
        task.status = status
    },
    setLoading(state, isLoading) {
        state.loading = isLoading
    }
}

export const actions = {
    async fetchTasks({ commit }, userID, isDone) {
        let ref
        commit('setLoading', true)
        if (isDone) {
            ref = fb.db
                .collection(COLLECTIONS.TASKS)
                .where('user.id', '==', userID)
                .where(isDone, '==', userID)
                .orderBy('doneAt', 'desc')
        } else {
            ref = fb.db
                .collection(COLLECTIONS.TASKS)
                .where('user.id', '==', userID)
        }
        const snapshot = await ref.get()
        if (!snapshot.docs.length) return null
        let tasks = []
        snapshot.forEach(doc => {
            let task = doc.data()
            task.id = doc.id
            tasks.push(task)
        })
        tasks = tasks.sort((a, b) => {
            return (
                b.isDone - a.isDone || b.createdAt.seconds - a.createdAt.seconds
            )
        })
        commit('setTasks', tasks)
        commit('setLoading', false)
        return tasks
    },
    async createCheckIn({ dispatch, commit, getters }, task) {
        try {
            const newTaskRef = await fb.db.collection('tasks').doc()
            const snapshot = await newTaskRef.set(task)
            const newTask = { ...task, id: newTaskRef.id }
            const tasks = getters.tasks
            commit('setTasks', [...tasks, newTask])
            return true
        } catch (e) {
            console.error(e)
            return null
        }
    },
    async setTaskStatus({ commit }, { task, isDone }) {
        commit('setStatus', task, isDone)
        const taskRef = fb.db.collection('tasks').doc(task.id)
        await taskRef.update({
            isDone: isDone,
            doneAt: fb.serverTimestamp()
        })
    },
    async deleteTask({ dispatch }, task) {
        fb.db
            .collection('tasks')
            .doc(task.id)
            .delete()
        dispatch('fetchTasks', task.user.id)
    }
}

export const getters = {
    loading(state) {
        return state.loading
    },
    tasks(state) {
        return state.tasks
    },
    dueTasks(state) {
        return state.tasks.filter(task => !task.isDone)
    },
    doneTasks(state) {
        return state.tasks.filter(task => task.isDone)
    }
}
