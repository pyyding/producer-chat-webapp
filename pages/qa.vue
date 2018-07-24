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
  data() {
    return {
      show: false,
      visibleQuestions: [],
      questions: [
        {
          id: 1,
          title: "How to edit note pressure in Logic?",
          description: "",
          tags: ["logic"],
          username: "Kaspar",
          answers: [
            {
              id: 1,
              username: "Saleem",
              text: "You can't do that. Just play it right. :)"
            },
            {
              id: 2,
              username: "Saleem",
              text: "Bad question"
            }
          ]
        },
        {
          id: 2,
          title: "How to edit note pressure?",
          description: "",
          tags: ["logic"],
          username: "Kaspar",
          answers: [
            {
              id: 1,
              username: "Saleem",
              text: "You can't do that. Just play it right. :)"
            }
          ]
        }
      ]
    };
  }
};
</script>
