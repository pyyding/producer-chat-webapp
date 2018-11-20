<template>
    <v-container>
        <v-layout row> 
            <v-flex md7 sm7>
                <v-btn v-if="user" flat color="" @click="showNewTaskCard"> ✅ add a task</v-btn>
                <v-btn v-if="user" color="" flat @click="showAskCard()">
                    🎹 post a track
                </v-btn>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex md7 sm7>
                <v-layout column>
                    <ask-card ref="askCard"/>
                    <new-task-card ref="newTaskCard"/>
                    <div class="mb-2" v-for="post in posts" :key="post.createdAt.seconds"> 
                        <question-card v-if="post.type === POST_TYPES.TRACK" :question="post.data" :dateString="post.dateString"/>
                        <post-task-card v-if="post.type === POST_TYPES.TASK" :post="post"/>
                    </div>
                </v-layout>
            </v-flex>
            <v-flex pl-2 lg4 md5 sm5 hidden-xs-only>
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
import AskCard from '~/components/qa/AskCard.vue'
import NewTaskCard from '~/components/tasks/NewTaskCard.vue'

export default {
  components: {
    QuestionCard,
    PostTaskCard,
    AppStreakList,
    AskCard,
    NewTaskCard
  },
  data() {
    return {
      POST_TYPES: POST_TYPES
    }
  },
  computed: {
    user() {
      return this.$store.getters['auth/user']
    },
    posts() {
      return this.$store.getters['activity/posts']
    }
  },
  methods: {
    showAskCard() {
      this.$refs.askCard.show()
      this.$refs.newTaskCard.hide()
    },
    showNewTaskCard() {
      this.$refs.newTaskCard.show()
      this.$refs.askCard.hide()
    }
  },
  beforeCreate() {
    this.$store.dispatch('activity/fetchPosts')
  }
}
</script>

<style>
</style>
