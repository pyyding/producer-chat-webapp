import Vue from 'vue'
import fb from '~/plugins/firebase'

export const state = () => ({
    tasks: []
})

export const mutations = {
    setTasks(state, tasks) {
        state.tasks = tasks
    },
    setStatus(state, task, status) {
        task.status = status
    }
}

export const actions = {
    async fetchTasks({ commit }, userID) {
        const snapshot = await fb.db
            .collection('tasks')
            .where('user.id', '==', userID)
            .get()
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
        return tasks
    },
    async createCheckIn({ dispatch, commit, getters }, task) {
        try {
            const newTaskRef = await fb.db.collection('tasks').doc()
            await newTaskRef.set(task, error => {
                if (error) {
                    Vue.notify({
                        group: 'notifications',
                        title: 'Woops',
                        text:
                            'Something went wrong, please refresh the page and try again.',
                        type: 'error'
                    })
                } else {
                    Vue.notify({
                        group: 'notifications',
                        title: 'Success',
                        text: "You're checked in for today, see you tomorrow",
                        type: 'success'
                    })
                }
            })
            const newTask = { ...task, id: newTaskRef.id }
            const tasks = getters.tasks
            commit('setTasks', [...tasks, newTask])
            return true
        } catch (e) {
            Vue.notify({
                group: 'notifications',
                title: 'Woops',
                text:
                    'Something went wrong, please refresh the page and try again.',
                type: 'error'
            })
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
