<template>
  <v-container fill-height>
    <v-progress-circular class="loadingSpinner" indeterminate color="primary" v-if="!producer"></v-progress-circular>
    <v-fade-transition>
      <v-layout row wrap align-center justify-center v-show="producer">
        <EditProfileDialog
          class="edit-button"
          v-if="user && producer.id === user.id"
          :producer="producer"
        />
        <v-flex xs12 class="header">
          <v-layout  row wrap>
            <v-flex lg3 md12>
              <v-layout row justify-center>
                <v-avatar :size="avatarSize">
                  <img :src="producer.photoURLLarge" alt="avatar">
                </v-avatar>
              </v-layout>
            </v-flex>
            <v-flex lg6 md7 sm7 xs8>
              <!-- <v-layout>
                <h1 class="hey-text text-xl-center font-weight-regular">Hi 👋</h1>
                <h1 class="hey-text text-xl-center font-weight-regular">Hi, I'm</h1>
              </v-layout> -->
              <v-layout row >
                <h1 class="header-text text-xl-center">
                  <!-- <span class="font-weight-regular">I'm</span> -->
                  {{ producer.displayName }}
                </h1>
              </v-layout>
              <v-layout row mt-2>
                <p class="bio-text">{{ producer.bio }}</p>
              </v-layout>
              <v-layout>
                <a
                  v-if="producer.soundcloud"
                  class="ml-1 mr-1 social-link"
                  :href="producer.soundcloud"
                  target="_blank"
                >
                  <img src="~/assets/social_icons/soundcloud.png" style="height: 32px; width: 32px">
                </a>
                
                <a
                  v-if="producer.instagram"
                  class="ml-1 mr-1 social-link"
                  :href="producer.instagram"
                  target="_blank"
                >
                  <img src="~/assets/social_icons/instagram.png" style="height: 32px; width: 32px">
                </a>
                
                <a
                  v-if="producer.bandcamp"
                  class="ml-1 mr-1 social-link"
                  :href="producer.bandcamp"
                  target="_blank"
                >
                  <img src="~/assets/social_icons/bandcamp.png" style="height: 32px; width: 32px">
                </a>
                
                <a
                  v-if="producer.youtube"
                  class="ml-1 mr-1 social-link"
                  :href="producer.youtube"
                  target="_blank"
                >
                  <img src="~/assets/social_icons/youtube.png" style="height: 32px; width: 32px">
                </a>
                
                <a
                  v-if="producer.bandcamp"
                  class="ml-1 mr-1 social-link"
                  :href="producer.spotify"
                  target="_blank"
                >
                  <img src="~/assets/social_icons/spotify.jpg" style="height: 32px; width: 32px">
                </a>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-layout row mt-2>
          <v-flex md12>
            <v-layout column>
              <div class="mb-2" v-for="post in posts" :key="post.createdAt.seconds">
                <question-card
                  v-if="post.type === POST_TYPES.TRACK"
                  :question="post.data"
                  :dateString="post.dateString"
                />
              </div>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-layout>
    </v-fade-transition>
  </v-container>
</template>

<script>
import { POST_TYPES } from '~/utils/constants.js'
import EditProfileDialog from '~/components/producers/EditProfileDialog.vue'
import QuestionCard from '~/components/qa/QuestionCard.vue'

export default {
  components: { EditProfileDialog, QuestionCard },
  computed: {
    user() {
      return this.$store.getters['auth/user']
    },
    producer() {
      return this.$store.getters['producer/producer']
    },
    avatarSize() {
      return 192
		},
		posts () {
			return this.$store.getters['producer/posts']
		}
  },
  data() {
    return {
			POST_TYPES: POST_TYPES
		}
  },
  beforeCreate() {
    const slug = this.$route.params.slug
    this.$store.dispatch('producer/fetchProducer', slug)
    this.$store.dispatch('producer/fetchPosts', slug)
  },
  methods: {
    signOut() {
      this.$store.dispatch('auth/signOut')
    }
  }
}
</script>

<style lang="stylus" scoped>
.social-link {
  cursor: pointer;
}

.header-text {
  font-size: 3em;
}

.hey-text {
  font-size: 3em;
}

.bio-text {
  font-size: 20px;
  background: black;
  padding: 10px;
  color: #e2e9ee;
  font-style: italic;
}

.section-title {
  font-size: 50px;
  font-weight: normal;
}

.edit-button {
  position: absolute;
  right: 40px;
  top: 20px;
}
.header { 
	background: gainsboro;
	border-radius: 3px;
	padding-top: 20px;
	padding-bottom: 20px;
}

.loadingSpinner {
  position: absolute;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  width: 100px;
}
</style>
