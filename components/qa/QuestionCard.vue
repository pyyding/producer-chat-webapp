<template>
  <v-card color="" class="mt-2">
      <v-card-title>
        <h3>
          {{question.title}}
        </h3>
        <v-spacer></v-spacer>
        <strong>{{question.username}}</strong>
        <v-avatar class="ml-2" size="36px"><img src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460" alt="avatar"></v-avatar>
  
      </v-card-title>
      <v-card-text>
        <a @click="extended = !extended" flat>{{`${question.answers.length} answer${question.answers.length === 1 ? '' : 's'} `}}</a>

      <v-slide-y-transition>
        <div class="mt-4" v-show="extended">
          <div v-for="answer in question.answers" :key="answer.id">
            <strong>{{ answer.username }}</strong>
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

<style scoped>

</style>