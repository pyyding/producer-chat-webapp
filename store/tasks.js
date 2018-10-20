import fb from '~/plugins/firebase'

export const state = () => ({
	tasks: []
})

export const mutations = {
	setTasks (state, tasks) {
		state.tasks = tasks
	}
}

export const actions = {
	async fetchTasks ({ commit }, userID) {
		const snapshot = await fb.db.collection('tasks').where('user.id', '==', userID).get()
		if (!snapshot.docs.length) return null
		let tasks = []
		snapshot.forEach(doc => {
			let task = doc.data()
			task.id = doc.id
			tasks.push(task)
		})
		tasks = tasks.sort((a, b) => { return b.isDone - a.isDone || b.createdAt.seconds - a.createdAt.seconds })
		commit('setTasks', tasks)
		return tasks
	},
	async createTask ({ dispatch }, task) {
		const newTaskRef = await fb.db.collection('tasks').doc()
		const snapshot = await newTaskRef.set(task)
		dispatch('fetchTasks', task.user.id)
		return snapshot
	},
	async setTaskStatus ({dispatch}, {task, isDone}) {
		await fb.db.collection('tasks').doc(task.id).delete()
		const editedTask = {
			text: task.text,
			createdAt: new Date(),
			isDone: isDone,
			user: task.user
		}
		dispatch('createTask', editedTask)
	},
	async deleteTask ({ dispatch }, task) {
		fb.db.collection('tasks').doc(task.id).delete()
		dispatch('fetchTasks', task.user.id)
	}
}

export const getters = {
	tasks (state) {
		return state.tasks
	}
}
