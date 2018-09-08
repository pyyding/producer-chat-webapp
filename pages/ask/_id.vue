<template>
	<v-container>
		<v-layout justify-center>
			<v-flex xl6>
				<v-layout row v-if="questionData.question">
					<h2>{{questionData.question.title}}</h2>
				</v-layout>
				<v-layout row v-if="questionData.question">
					asked by &nbsp; <strong>{{questionData.question.user.displayName}}</strong>
				</v-layout>
				<v-divider class="mt-1 mb-1"/>
				<answer-form :questionID="questionID" :user="user"/>
				<v-layout row mt-5>
					<v-flex v-if="questionData.answers">
						<div v-for="answer in questionData.answers" :key="answer.id" class="">
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
			}
		},
		computed: {
			user () { return this.$store.getters['auth/user'] },
			questionData () { return this.$store.getters['qa/questionData'] }
		},
		beforeCreate () {
			this.questionID = this.$route.params.id
			this.$store.dispatch('qa/getQuestionData', this.questionID)
		}
	}
</script>

<style lang="stylus">
</style>