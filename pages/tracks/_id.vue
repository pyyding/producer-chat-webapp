<template>
	<v-container v-if="questionData">
		<v-layout>
			<v-flex>
				<question-card v-if="questionData.question" :question="questionData.question"/>
			</v-flex>
		</v-layout>
		<v-layout justify-center>
			<v-flex>
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
import QuestionCard from '~/components/qa/QuestionCard.vue'
export default {
  components: { AnswerForm, AnswerCard, QuestionCard },
  data() {
    return {}
  },
  computed: {
    user() {
      return this.$store.getters['auth/user']
    },
    questionData() {
      const data = this.$store.getters['qa/questionData']
      if (data.question && data.question.id !== this.questionID) return
      return data
    }
  },
  beforeCreate() {
    this.questionID = this.$route.params.id
    this.$store.dispatch('qa/getQuestionData', this.questionID)
  }
}
</script>
