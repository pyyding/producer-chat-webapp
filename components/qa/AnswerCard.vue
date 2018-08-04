<template>
	<div v-if="answer && user">
		<v-layout row align-center>
			<v-avatar class="mr-2" size="36px"><img :src="answer.user.photoURL" alt="avatar"></v-avatar>
			<div>
				<strong>{{answer.user.displayName}}</strong>
				<div><span class="grey--text">{{answer.createdAt.toDate().toLocaleDateString()}}</span></div>
			</div>
			<v-btn title="delete answer" icon v-if="user && user.id === answer.user.id" @click="deleteAnswer"><v-icon color="grey" small>clear</v-icon></v-btn>
		</v-layout>
		<v-layout row mt-2>
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
		methods: {
			deleteAnswer () {
				this.$store.dispatch('qa/deleteAnswer', this.answer.id)
					.then(() => { this.$store.dispatch('qa/getQuestionData', this.answer.questionID) })
			}
		}
	}
</script>

<style scoped lang="stylus">
	.answer--text
		&:first-line
			line-height 0
		white-space pre-line
</style>