import firebase from '~/plugins/firebase'
const db = firebase.firestore()
const settings = {/* your settings... */ timestampsInSnapshots: true }
db.settings(settings)

export const state = () => ({
	questions: [],
	questionData: {}
})

export const mutations = {
	setQuestions (state, questions) {
		state.questions = questions
	},
	setQuestionData (state, data) {
		// const newAnswers = data.answers.sort((a, b) =>  { return b.createdAt - a.createdAt }).slice()
		// data.answers = newAnswers
		state.questionData = data
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
	},
	async deleteAnswer ({ commit, dispatch }, id) {
		await db.collection('answers').doc(id).delete()
	},
	async getQuestionData ({ commit }, id) {
  	const questionSnapshot = await db.collection('questions').doc(id).get()
		const answersSnapshot = await db.collection('answers').where('questionID', '==', id).get()
		const answers = []
		answersSnapshot.forEach(doc => {
			const answer = doc.data()
			answer.id = doc.id
			answers.push(answer)
		})
		commit('setQuestionData', {question: questionSnapshot.data(), answers: answers})

		return data
	},
	async submitAnswer ({ commit, dispatch }, answer) {
  	const newAnswerRef = await db.collection('answers').doc()
		const snapshot = await newAnswerRef.set(answer)
		dispatch('getQuestionData', answer.questionID)
		return snapshot
	}
}

export const getters = {
	questions (state) {
		return state.questions
	},
	questionData (state) {
		return state.questionData
	}
}
