<template>
  <v-container fill-height>
    <v-progress-circular
      v-if="!producer"
      class="loadingSpinner"
      indeterminate
      color="primary"/>
    <v-fade-transition>
      <v-layout
        v-show="producer"
        row
        wrap
        align-center
        justify-center>
        <EditProfileDialog
          v-if="user && producer.id === user.id"
          :producer="producer"
          class="edit-button"
        />
        <v-flex
          xs12
          class="header">
          <v-layout
            row
            wrap>
            <v-flex
              lg3
              md3
              sm4
            >
              <v-layout
                row
                justify-center>
                <v-avatar :size="avatarSize">
                  <img
                    :src="producer.photoURLLarge"
                    alt="avatar">
                </v-avatar>
              </v-layout>
            </v-flex>
            <v-flex
              lg9
              md9
              sm8
              xs12
              pl-2
              pr-2
            >
              <v-layout row >
                <h1 class="header-text text-xl-center">
                  <!-- <span class="font-weight-regular">I'm</span> -->
                  {{ producer.displayName }}
                </h1>
              </v-layout>
              <v-layout
                row
                mt-2>
                <p class="bio-text">{{ producer.bio }}</p>
              </v-layout>
              <v-layout>
                <a
                  v-if="producer.soundcloud"
                  :href="producer.soundcloud"
                  class="ml-1 mr-1 social-link"
                  target="_blank"
                >
                  <icon-base
                    width="25"
                    height="25"
                    icon-color="#44A1A0"
                    icon-name="soundcloud"><soundcloud-icon /></icon-base>
                </a>

                <a
                  v-if="producer.instagram"
                  :href="producer.instagram"
                  class="ml-1 mr-1 social-link"
                  target="_blank"
                >
                  <icon-base
                    width="25"
                    height="25"
                    icon-name="instagram"
                    icon-color="#44A1A0"
                  ><instagram-icon /></icon-base>
                </a>

                <a
                  v-if="producer.bandcamp"
                  :href="producer.bandcamp"
                  class="ml-1 mr-1 social-link"
                  target="_blank"
                >
                  <icon-base
                    width="25"
                    height="25"
                    icon-color="#44A1A0"
                    icon-name="bandcamp"><bandcamp-icon /></icon-base>
                </a>

                <a
                  v-if="producer.youtube"
                  :href="producer.youtube"
                  class="ml-1 mr-1 social-link"
                  target="_blank"
                >
                  <icon-base
                    width="25"
                    height="25"
                    icon-color="#44A1A0"
                    icon-name="youtube"><youtube-icon /></icon-base>
                </a>

                <a
                  v-if="producer.spotify"
                  :href="producer.spotify"
                  class="ml-1 mr-1 social-link"
                  target="_blank"
                >
                  <icon-base
                    width="25"
                    height="25"
                    icon-color="#44A1A0"
                    icon-name="spotify"><spotify-icon /></icon-base>
                </a>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-layout
          row
          mt-2>
          <v-flex md12>
            <v-layout column>
              <div
                v-for="post in posts"
                :key="post.createdAt.seconds"
                class="mb-2">
                <track-card
                  v-if="post.type === POST_TYPES.TRACK"
                  :question="post.data"
                  :date-string="post.dateString"
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
import TrackCard from '~/components/tracks/TrackCard.vue'
import SoundcloudIcon from '~/components/icons/SoundcloudIcon.vue'
import InstagramIcon from '~/components/icons/InstagramIcon.vue'
import YoutubeIcon from '~/components/icons/YoutubeIcon.vue'
import SpotifyIcon from '~/components/icons/SpotifyIcon.vue'
import BandcampIcon from '~/components/icons/BandcampIcon.vue'
import IconBase from '~/components/icons/IconBase.vue'

export default {
    components: {
        EditProfileDialog,
        TrackCard,
        IconBase,
        SoundcloudIcon,
        InstagramIcon,
        YoutubeIcon,
        BandcampIcon,
        SpotifyIcon
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
        producer() {
            return this.$store.getters['producer/producer']
        },
        avatarSize() {
            return 192
        },
        posts() {
            return this.$store.getters['producer/posts']
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
    color: #e2e9ee;
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
	background-image: url('~assets/default-cover-5.jpg');
	border-radius: 3px;
	padding: 20px;
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
