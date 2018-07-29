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
			questions.push(doc.data())
		})
    commit('setQuestions', questions)
  }
}

export const getters = {
	questions (state) {
		return state.questions
	}
}
