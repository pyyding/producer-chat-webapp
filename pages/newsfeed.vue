<template>
    <v-container>
        <v-layout row>
            <v-flex>
                <v-layout column>
                    <div v-for="post in posts" :key="post.createdAt.seconds"> 
                        <question-card v-if="post.type === POST_TYPES.TRACK" :question="post.data"/>
                        <post-task-card v-if="post.type === POST_TYPES.TASK" :post="post"/>
                    </div>
                </v-layout>
            </v-flex>
            <v-flex pl-4 md4 hidden-xs-only>
                <v-layout row>
                <app-streak-list/>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { POST_TYPES } from '~/utils/constants.js'
import QuestionCard from '~/components/qa/QuestionCard.vue'
import PostTaskCard from '~/components/posts/PostTaskCard.vue'
import AppStreakList from '~/components/AppStreakList.vue'

export default {
  components: { QuestionCard, PostTaskCard, AppStreakList },
  data() {
    return {
      POST_TYPES: POST_TYPES
    }
  },
  computed: {
    posts() {
      return this.$store.getters['newsfeed/posts']
    }
  },
  beforeCreate() {
    this.$store.dispatch('newsfeed/fetchPosts')
  }
}
</script>

<style>
</style>
