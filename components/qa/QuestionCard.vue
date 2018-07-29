<template>
  <v-card color="" class="mt-2" flat>
      <v-card-title>
        <v-avatar class="mr-2" size="36px"><img :src="question.user.photoURL72" alt="avatar"></v-avatar>
        <strong class="">{{question.user.displayName}}</strong>
      </v-card-title>
    <v-card-text>
      <h2>
          {{question.title}}
      </h2>
      <p>
        <a class="grey--text" @click="extended = !extended" flat>{{`${question.answerCount} answer${question.answerCount === 1 ? '' : 's'} `}}</a>
      </p>
      <v-slide-y-transition>
        <div class="mt-4" v-show="extended">
          <div v-for="answer in question.answers" :key="answer.id">
            <strong>{{ answer.displayName }}</strong>
            <p>
              {{ answer.text }}
            </p>
          </div>
        </div>
      </v-slide-y-transition>
      </v-card-text>
      <v-form v-if="showAnswerForm">
        <v-textarea box label="Write your answer here"></v-textarea>
      </v-form>
    <v-card-actions>
      <v-btn v-if="showAnswerForm" color="grey" flat @click="showAnswerForm = false">CANCEL</v-btn>
      <v-btn v-if="showAnswerForm" flat>POST <v-icon right color="primary">send</v-icon></v-btn>
      <v-btn v-if="!showAnswerForm" @click="showAnswerForm = true" flat>Answer</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
  export default {
    props: ['question'],
    data () {
      return {
        extended: false,
        showAnswerForm: false
      }
    }
  }
</script>

<style scoped lang="stylus">
  .v-card__text
    padding 0 16px
  .v-card__actions
    padding 0px 8px 8px 8px
</style>