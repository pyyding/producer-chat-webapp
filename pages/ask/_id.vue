<template>
	<v-container>
		<v-layout>
			<v-flex xl6>
				<v-layout row v-if="questionData.question">
					<h2>{{questionData.question.title}}</h2>
				</v-layout>
				<v-layout row v-if="questionData.question">
					asked by &nbsp; <strong>{{questionData.question.user.displayName}}</strong>
				</v-layout>
				<v-divider class="mt-3"/>
				<v-layout row>
					<v-btn class="ml-0" color="primary" @click="showAnswerForm = ! showAnswerForm" flat><v-icon left>create</v-icon>Answer</v-btn>
				</v-layout>
				<answer-form :questionID="questionID" :user="user" v-if="showAnswerForm"/>
				<v-layout row mt-5>
					<v-flex v-if="questionData.answers">
						<div v-for="answer in questionData.answers" :key="answer.id" class="mb-4">
							<answer-card :answer="answer" :user="user"/>
						</div>
					</v-flex>
				</v-layout>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
	import AnswerForm from '~/components/qa/AnswerForm.vue'
	import AnswerCard from '~/components/qa/AnswerCard.vue'
	export default {
		components: {AnswerForm, AnswerCard},
		data () {
			return {
				showAnswerForm: false
			}
		},
		computed: {
			questionData () { return this.$store.getters['qa/questionData'] },
			user () { return this.$store.getters['auth/user'] }
		},
		beforeCreate () {
			this.questionID = this.$route.params.id
			this.$store.dispatch('qa/getQuestionData', this.questionID)
		}
	}
</script>

<style lang="stylus">
</style>