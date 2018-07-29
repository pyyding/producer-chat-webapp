import firebase from '~/plugins/firebase'
const db = firebase.firestore()
const settings = {/* your settings... */ timestampsInSnapshots: true }
db.settings(settings)

export const state = () => ({
	questions: []
})

export const mutations = {
	setQuestions (state, questions) {
		state.questions = questions
	}
}

export const actions = {
  async getQuestions ({ commit }) {
    const snapshot = await db.collection('questions').get()
		let questions = []
		snapshot.forEach(doc => {
			let question = doc.data()
			question.id = doc.id
			questions.push(question)
		})
	  commit('setQuestions', questions)
  },
	async ask ({ commit, dispatch }, question) {
		const newQuestionRef = await db.collection('questions').doc()
		const snapshot = await newQuestionRef.set(question)
		dispatch('getQuestions')
		return snapshot
	},
	async deleteQuestion ({ commit, dispatch }, id) {
		await db.collection('questions').doc(id).delete()
		dispatch('getQuestions')
	}
}

export const getters = {
	questions (state) {
		return state.questions
	}
}
