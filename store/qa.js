import fb from '~/plugins/firebase'

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
    const snapshot = await fb.db.collection('questions').get()
		let questions = []
		snapshot.forEach(doc => {
			let question = doc.data()
			question.id = doc.id
			questions.push(question)
		})
	  commit('setQuestions', questions)
  },
	async ask ({ commit, dispatch }, question) {
		const newQuestionRef = await fb.db.collection('questions').doc()
		const snapshot = await newQuestionRef.set(question)
		dispatch('getQuestions')
		return snapshot
	},
	async deleteQuestion ({ commit, dispatch }, id) {
		await fb.db.collection('questions').doc(id).delete()
		dispatch('getQuestions')
	},
	async deleteAnswer ({ commit, dispatch }, id) {
		await fb.db.collection('answers').doc(id).delete()
	},
	async getQuestionData ({ commit, dispatch}, id) {
  	const questionSnapshot = await fb.db.collection('questions').doc(id).get()
		const answersSnapshot = await fb.db.collection('answers').where('questionID', '==', id).get()
		const answers = []
		for (const doc of answersSnapshot.docs) {
			const answer = doc.data()
			answer.id = doc.id
			answers.push(answer)
		}
		const question = questionSnapshot.data()
		question.id = id
		commit('setQuestionData', {question: question, answers: answers})
	},
	async submitAnswer ({ commit, dispatch }, answer) {
  	const newAnswerRef = await fb.db.collection('answers').doc()
		const snapshot = await newAnswerRef.set(answer)
		dispatch('getQuestionData', answer.questionID)
		return snapshot
	},
	async castVote ({ commit, dispatch }, { vote, questionID }) {
		const existingVoteSnapshot = await fb.db.collection('votes').where('userID', '==', vote.userID).where('answerID', '==', vote.answerID).get()
		const existingVote = existingVoteSnapshot.docs
		if (existingVote.length === 1) {
  		if (existingVote[0].data().isUpvote !== vote.isUpvote) {
  			await fb.db.collection('votes').doc(existingVote[0].id).delete()
			  const newVoteRef = await fb.db.collection('votes').doc(`${vote.answerID}_${vote.userID}`)
			  await newVoteRef.set(vote)
				setTimeout( () => { dispatch('getQuestionData', questionID) }, 500)
			}
		} else {
			const newVoteRef = await fb.db.collection('votes').doc(`${vote.answerID}_${vote.userID}`)
			await newVoteRef.set(vote)
		}
	},
	async fetchUserAnswerVote (_context, {answerID, userID}) {
		const snapshot = await fb.db.collection('votes').where('answerID', '==', answerID).where('userID', '==', userID).get()
		if (!snapshot.docs.length) return null
		return snapshot.docs[0].data()
	},
	async submitReply (_context, reply) {
  	const replyRef = await fb.db.collection('replies').doc()
		const snapshot = await replyRef.set(reply)
	},
	async fetchReplies (_context, { answerID }) {
		const snapshot = await fb.db.collection('replies').where('answerID', '==', answerID).orderBy('createdAt').get()
		let replies = []
		snapshot.forEach(doc => {
			let reply = doc.data()
			reply.id = doc.id
			replies.push(reply)
		})
		return replies
	},
	async deleteReply (_context, { id }) {
		await fb.db.collection('replies').doc(id).delete()
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
