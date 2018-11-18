<template>
  <v-card color="" flat>
      <v-card-title class="align-center">
        <v-layout column>
          <v-flex>
          <v-avatar class="mr-2 hidden-xs-only" size="36px"><img :src="question.user.photoURL" alt="avatar"></v-avatar>
          <span><strong>{{question.user.displayName}}</strong> posted a track</span>
          <v-rating
            v-model="question.ratingAvg"
            half-increments
            readonly
            small
            dense
            class="d-inline-block"
            color="secondary"
          />
          <v-btn
            small
            icon
            title="delete question"
            v-if="user && user.id === question.user.id"
            @click="deleteQuestion"
            class="pull-right"
          >
            <v-icon color="grey" small>clear</v-icon>
          </v-btn>
          </v-flex>
        </v-layout>
      </v-card-title>
      <v-card-text>
            <iframe class="mb-4" v-if="question.link.includes('soundcloud')" width="100%" height="100" scrolling="no" frameborder="no" allow="autoplay" :src="`https://w.soundcloud.com/player/?url=${question.link}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`"/>
            <iframe class="mb-4" v-else-if="question.link.includes('spotify')" :src="question.link" width="100%" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"/>
            <iframe class="mb-4" v-else-if="question.link.includes('clyp')" width="100%" height="160" :src="`${question.link}/widget`" frameborder="0"></iframe>  
            <v-flex v-else mt-2 mb-4 class="text-xs-center">
              <span style="display: inline-flex; flex-direction: column; cursor: pointer">
                <v-icon :href="question.link" target="_blank" color="primary">play_circle_filled</v-icon>
                <a :href="question.link" target="_blank"> listen from here</a>
              </span>
            </v-flex>
      </v-card-text>
      <v-card-actions>
        <v-btn v-if="$route.path.includes('activity')" :to="`/tracks/${question.id}`" depressed color="success" flat>
          see thread
        </v-btn>
      </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    question: {
      type: Object,
      default: null
    }
  },
  computed: {
    user() {
      return this.$store.getters['auth/user']
    }
  },
  data() {
    return {
      extended: false,
      showAnswerForm: false
    }
  },
  methods: {
    deleteQuestion() {
      this.$store.dispatch('qa/deleteQuestion', this.question.id)
    }
  }
}
</script>

<style scoped lang="stylus">
.v-card__title {
  padding: 16px 16px 8px 16px;
}

.v-card__text {
  padding: 15px 16px;
}

.v-card__actions {
  padding: 0 8px 8px 8px;
}

@media (max-width: 599px) {
  .v-card__title {
    padding: 5px 10px 5px 0;
    align-items: flex-start;
  }
}
</style>
