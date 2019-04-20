<template>
  <v-card
    color
    flat
  >
    <v-card-title class="pl-4">
      <v-layout>
        <div class="d-flex align-items-top">
          <nuxt-link :to="`/${question.user.slug || question.user.id}`">
            <v-avatar
              class="mr-2"
              size="36px"
            >
              <img
                :src="question.user.photoURL"
                alt="avatar"
              >
            </v-avatar>
          </nuxt-link>
          <div class="d-inline-block ml-1">
            <span>
              <nuxt-link :to="`/${question.user.slug || question.user.id}`">
                <strong>{{ question.user.displayName }}</strong>
              </nuxt-link>
              posted a track
            </span>
            <div class="caption grey--text">
              {{ dateString }}
            </div>
          </div>
          <v-btn
            v-if="user && user.id === question.user.id"
            small
            icon
            title="delete question"
            class="delete_button"
            @click="deleteTrack"
          >
            <v-icon
              color="grey"
              small
            >
              clear
            </v-icon>
          </v-btn>
        </div>
      </v-layout>
    </v-card-title>
    <v-card-text>
      <iframe
        v-if="question.link.includes('soundcloud')"
        :src="
          `https://w.soundcloud.com/player/?url=${
            question.link
          }&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`
        "
        class="mb-4"
        width="100%"
        height="100"
        scrolling="no"
        frameborder="no"
        allow="autoplay"
      />
      <iframe
        v-else-if="question.link.includes('spotify')"
        :src="question.link"
        class="mb-4"
        width="100%"
        height="80"
        frameborder="0"
        allowtransparency="true"
        allow="encrypted-media"
      />
      <iframe
        v-else-if="question.link.includes('clyp')"
        :src="`${question.link}/widget`"
        class="mb-4"
        width="100%"
        height="160"
        frameborder="0"
      />
      <v-flex
        v-else
        mt-2
        mb-4
        class="text-xs-center"
      >
        <span
          style="display: inline-flex; flex-direction: column; cursor: pointer"
        >
          <v-icon
            :href="question.link"
            target="_blank"
            color="primary"
          >play_circle_filled</v-icon>
          <a
            :href="question.link"
            target="_blank"
          >listen from here</a>
        </span>
      </v-flex>
    </v-card-text>
    <v-card-actions>
      <v-btn
        v-if="$route.path.includes('activity')"
        :to="`/tracks/${question.id}`"
        depressed
        color="success"
        flat
      >
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
        },
        dateString: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            extended: false,
            showTrackReplyForm: false
        }
    },
    computed: {
        user() {
            return this.$store.getters['auth/user']
        }
    },
    methods: {
        deleteTrack() {
            this.$confirm('Do you really want to delete your track?').then(
                res => {
                    if (res) {
                        this.$store.dispatch(
                            'tracks/deleteTrack',
                            this.question.id
                        )
                    }
                }
            )
        }
    }
}
</script>

<style scoped lang="stylus">
.v-card__title
  padding 16px 16px 8px 16px

.v-card__text
  padding 15px 16px


.v-card__actions
  padding 0 8px 8px 8px


.delete_button
    position absolute
    top 5px
    right 0

</style>
