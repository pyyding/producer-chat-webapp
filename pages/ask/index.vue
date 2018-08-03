<template>
  <v-container>
    <v-layout row>
    <v-flex xs10 >
      <ask-card/>
    </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs10 >
        <question-card
          v-for="question in questions"
          :key="question.id"
          :question="question"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import QuestionCard from '~/components/qa/QuestionCard'
  import AskCard from '~/components/qa/AskCard'
export default {
  components: { QuestionCard, AskCard },
	computed: {
		questions () {
			return this.$store.getters['qa/questions']
		}
	},
  beforeCreate() {
  	this.$store.dispatch('qa/getQuestions')
  }
}
</script>

<style lang="stylus" scoped>

</style>