<template>
	<v-container v-if="questionData">
		<v-layout justify-center>
			<v-flex xl6>
				<v-layout v-if="questionData.question">
					<h2>
						{{questionData.question.title}}
					</h2>
					<v-btn
						small
						icon
						v-if="questionData.question.link"
						target="_blank"
						title="question link"
						:href="questionData.question.link"
					>
						<v-icon color="secondary">play_circle_outline</v-icon>
					</v-btn>

				</v-layout>
				<v-layout row v-if="questionData.question">
					posted by &nbsp; <strong>{{questionData.question.user.displayName}}</strong>
				</v-layout>
				<answer-form class="mt-4" :questionID="questionID" :user="user"/>
				<v-layout row mt-5>
					<v-flex v-if="questionData.answers">
						<div v-for="answer in questionData.answers" :key="answer.id" class="">
							<answer-card :answer="answer" :user="user"/>
						</div>
					</v-flex>
				</v-layout>
				<v-layout row mt-5 v-if="questionData.answers && questionData.answers.length === 0">
					<v-flex>
						<v-card height="300" flat color="grey lighten-4" v-if="questionData.question">
							<v-layout fill-height align-center text-sm-center>
								<v-card-text>
									<h2>{{questionData.question.user.displayName}} would be super thankful for your feedback!</h2>
								</v-card-text>
							</v-layout>
						</v-card>
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
			questionData () {
				const data = this.$store.getters['qa/questionData']
				if (data.question && data.question.id !== this.questionID) return
				return data
			}
		},
		beforeCreate () {
			this.questionID = this.$route.params.id
			this.$store.dispatch('qa/getQuestionData', this.questionID)
		}
	}
</script>
