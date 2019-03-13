<template>
  <v-container>
    <v-layout row>
      <v-flex
        md7
        sm7
      >
        <v-btn
          v-if="user"
          flat
          color=""
          @click="showNewTaskCard"
        >
          ✅ add a task
        </v-btn>
        <v-btn
          v-if="user"
          color=""
          flat
          @click="showPostTrackForm()"
        >
          🎹 post a track
        </v-btn>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex
        md7
        sm7
      >
        <v-layout column>
          <track-form ref="trackForm" />
          <new-task-card ref="newTaskCard" />
          <div
            v-for="post in posts"
            :key="post.createdAt.seconds"
            class="mb-2"
          >
            <track-card
              v-if="post.type === POST_TYPES.TRACK"
              :question="post.data"
              :date-string="post.dateString"
            />
            <post-task-card
              v-if="post.type === POST_TYPES.TASK"
              :post="post"
            />
          </div>
        </v-layout>
      </v-flex>
      <v-flex
        pl-2
        lg4
        md5
        sm5
        hidden-xs-only
      >
        <v-layout row>
          <app-streak-list />
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { POST_TYPES } from '~/utils/constants.js'
import TrackCard from '~/components/tracks/TrackCard.vue'
import PostTaskCard from '~/components/posts/PostTaskCard.vue'
import AppStreakList from '~/components/AppStreakList.vue'
import TrackForm from '~/components/tracks/TrackForm.vue'
import NewTaskCard from '~/components/tasks/NewTaskCard.vue'

export default {
    components: {
        TrackCard,
        PostTaskCard,
        AppStreakList,
        TrackForm,
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
    beforeCreate() {
        this.$store.dispatch('activity/fetchPosts')
    },
    methods: {
        showPostTrackForm() {
            this.$refs.trackForm.show()
            this.$refs.newTaskCard.hide()
        },
        showNewTaskCard() {
            this.$refs.newTaskCard.show()
            this.$refs.trackForm.hide()
        }
    }
}
</script>

<style>
</style>
