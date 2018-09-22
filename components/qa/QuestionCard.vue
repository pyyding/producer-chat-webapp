<template>
  <v-card color="" class="mt-2" flat>
      <v-card-title class="align-center">
        <v-btn small title="question link" v-if="question.link" :href="question.link" target="_blank" icon><v-icon color="secondary">play_circle_outline</v-icon></v-btn>
        <v-flex xs7>
          <h2>
            <nuxt-link :to="`/feedback/${question.id}`">
              {{question.title}}
            </nuxt-link>
          </h2>
          <v-rating
            style="width:100px"
            v-model="question.ratingAvg"
            half-increments
            readonly
            small
            dense
            color="secondary"
          />
        </v-flex>
        <v-spacer/>
        <v-btn
          small
          icon
          title="delete question"
          v-if="user && user.id === question.user.id"
          @click="deleteQuestion"
        >
          <v-icon color="grey" small>clear</v-icon>
        </v-btn>
        <v-flex class="xs3 sm4 text-xs-right">
          <span class="">{{question.user.displayName}}</span>
          <v-avatar class="ml-2 hidden-xs-only" size="36px"><img :src="question.user.photoURL" alt="avatar"></v-avatar>
        </v-flex>
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
    padding 16px 16px 8px 16px
  .v-card__text
    padding 0 16px
  .v-card__actions
    padding 0 8px 8px 8px
  @media (max-width 599px)
    .v-card__title
      padding 5px 10px 5px 0
      align-items flex-start
</style>
