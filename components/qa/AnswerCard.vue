<template>
	<div v-if="answer && user">
		<v-layout row align-center>
			<v-avatar class="ml-2 mr-2" size="36px"><img :src="answer.user.photoURL" alt="avatar"></v-avatar>
			<div>
				<strong>{{answer.user.displayName}}</strong>
				<div><span class="grey--text">{{answer.createdAt.toDate().toLocaleDateString()}}</span></div>
			</div>
			<v-btn title="delete answer" icon v-if="user && user.id === answer.user.id" @click="deleteAnswer"><v-icon color="grey" small>clear</v-icon></v-btn>
		</v-layout>
		<v-layout row mt-2>
			<v-flex>
				<div class="vote-widget">
					<v-btn icon :class="{ active: userVote && userVote.isUpvote}" @click="castVote(true)"><v-icon>arrow_drop_up</v-icon></v-btn>
					<h2 class="vote-widget__count">{{answer.voteSum}}</h2>
					<v-btn icon :class="{ active: userVote && !userVote.isUpvote}" @click="castVote(false)"><v-icon>arrow_drop_down</v-icon></v-btn>
				</div>
			</v-flex>
			<v-flex>
			</v-flex>
			<p class="answer--text">
				{{answer.text}}
			</p>
		</v-layout>
	</div>
</template>

<script>
	export default {
		props: ['answer', 'user'],
		data () {
			return {}
		},
		computed: {
			userVote () {
				return this.$store.dispatch('qa/getUserAnswerVote', { answerID: this.answer.id, userID: this.user.id })
			}
		},
		methods: {
			deleteAnswer () {
				this.$store.dispatch('qa/deleteAnswer', this.answer.id)
					.then(() => { this.$store.dispatch('qa/getQuestionData', this.answer.questionID) })
			},
			async castVote (isUpvote) {
				const vote = {
					answerID: this.answer.id,
					userID: this.user.id,
					isUpvote: isUpvote,
					createdAt: new Date()
				}
				const params = {
					vote: vote,
					questionID: this.answer.questionID
				}
				await this.$store.dispatch('qa/castVote', params)
			}
		}
	}
</script>

<style scoped lang="stylus">
	.answer--text
		&:first-line
			line-height 0
		white-space pre-line
	.vote-widget
		.vote-widget__count
			text-align center
		.vote-widget__button.active
			color green
</style>
