<template>
  <v-container>
    <v-layout row>
      <v-flex
        md7
        sm7
      >
        <v-layout column>
          <v-layout
            v-if="user"
            column
            class="buttons-row"
          >
            <v-flex
              md7
              sm7
            >
              <v-btn
                class="checkin-button"
                dark
                @click="showNewCheckInCard"
              >
                check in
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
            <track-form ref="trackForm" />
            <new-check-in-card ref="newCheckInCard" />
          </v-layout>
          <v-progress-circular
            v-if="posts.length === 0"
            class="loadingSpinner"
            indeterminate
            color="primary"
          />
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
import NewCheckInCard from '~/components/tasks/NewCheckInCard.vue'

export default {
    components: {
        TrackCard,
        PostTaskCard,
        AppStreakList,
        TrackForm,
        NewCheckInCard
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
            this.$refs.newCheckInCard.hide()
        },
        showNewCheckInCard() {
            this.$refs.newCheckInCard.show()
            this.$refs.trackForm.hide()
        }
    }
}
</script>

<style lang="stylus" scoped>
.loadingSpinner
    margin-top 50px
    display block
    margin-left auto
    margin-right auto

.checkin-button
    background-image: linear-gradient(to right, #008ce4 0%, #6d98ad 69%)

.buttons-row
    border 2px solid #0000000a
    border-radius 5px
    margin-bottom 21px
</style>
