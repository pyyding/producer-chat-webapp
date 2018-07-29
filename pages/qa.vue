<template>
  <v-layout column>
    <question-card 
    v-for="question in questions" 
    :key="question.id" 
    :question="question"
    />
  </v-layout>
</template>

<script>
  import QuestionCard from '~/components/qa/QuestionCard'
export default {
  components: { QuestionCard },
	computed: {
		questions () {
			return this.$store.getters['qa/questions']
		}
	},
  asyncData ({store}) {
    store.dispatch('qa/getQuestions')
  }
}
</script>
