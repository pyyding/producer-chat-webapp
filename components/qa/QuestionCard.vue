<template>
  <v-card color="" class="mt-2" flat>
      <v-card-title>
        <h2>
          <nuxt-link :to="`/feedback/${question.id}`">
            {{question.title}}
          </nuxt-link>
          <span class="success--text">
              ({{question.ratingAvg}} <v-icon color="success">star</v-icon>)
            </span>
        </h2>
        <v-btn title="question link" v-if="question.link" :href="question.link" target="_blank" icon><v-icon color="primary">play_circle_filled</v-icon></v-btn>
        <v-btn title="delete question" icon v-if="user && user.id === question.user.id" @click="deleteQuestion"><v-icon color="grey" small>clear</v-icon></v-btn>
        <v-spacer/>
        <strong class="">by {{question.user.displayName}}</strong>
        <v-avatar class="ml-2" size="36px"><img :src="question.user.photoURL" alt="avatar"></v-avatar>
      </v-card-title>
  </v-card>
</template>

<script>
  export default {
    props: ['question'],
    computed: {
    	user () { return this.$store.getters['auth/user']}
    },
    data () {
      return {
        extended: false,
        showAnswerForm: false
      }
    },
    methods: {
    	deleteQuestion () {
    		this.$store.dispatch('qa/deleteQuestion', this.question.id)
      }
    }
  }
</script>

<style scoped lang="stylus">
  .v-card__title
    padding 16px 16px 8 16px
  .v-card__text
    padding 0 16px
  .v-card__actions
    padding 0 8px 8px 8px
</style>
