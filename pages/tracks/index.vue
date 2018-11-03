<template>
  <v-container fluid>
    <v-layout row>
      <v-flex>
        <v-layout row>
          <v-flex xl6>
            <ask-card/>
          </v-flex>
          </v-layout>
        <v-layout row>
          <v-flex xl6 align-center>
            <question-card
              v-for="question in questions"
              :key="question.id"
              :question="question"
            />
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import QuestionCard from '~/components/qa/QuestionCard'
  import AskCard from '~/components/qa/AskCard'
  import AppStreakList from '~/components/AppStreakList'

export default {
  components: { QuestionCard, AskCard, AppStreakList },
	computed: {
		questions () {
			return this.$store.getters['qa/questions']
    }
	},
  beforeCreate () {
    this.$store.dispatch('qa/getQuestions')
  }
}
</script>

<style lang="stylus" scoped>

</style>
