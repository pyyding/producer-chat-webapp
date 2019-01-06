<template>
  <v-container align-center fill-height>
		<v-progress-circular
			class="loadingSpinner"
      indeterminate
      color="primary"
			v-if="!producer"
    ></v-progress-circular>
    <v-fade-transition>
      <v-layout row wrap align-center justify-center v-show="producer">
        <EditProfileDialog
          class="edit-button"
          v-if="user && producer.id === user.id"
          :producer="producer"
        />
        <v-flex xs12>
          <v-layout align-center justify-center row wrap>
            <v-flex lg6 md12>
              <v-layout row justify-center>
                <v-avatar :size="avatarSize">
                  <img :src="producer.photoURLLarge" alt="avatar">
                </v-avatar>
              </v-layout>
            </v-flex>
            <v-flex lg6 md7 sm7 xs8>
              <v-layout>
                <h1 class="hey-text text-xl-center font-weight-regular">Hi 👋</h1>
                <!-- <h1 class="hey-text text-xl-center font-weight-regular">Hi, I'm</h1> -->
              </v-layout>
              <v-layout row mb-5>
                <h1 class="header-text text-xl-center">
                  <span class="font-weight-regular">I'm</span>
                  {{ producer.displayName }}
                </h1>
              </v-layout>
              <v-layout row mt-2>
                <p class="bio-text">{{ producer.bio }}</p>
              </v-layout>
              <v-layout row mt-2 mb-2>
                <h2>follow me on</h2>
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
      </v-layout>
    </v-fade-transition>
  </v-container>
</template>

<script>
import EditProfileDialog from '~/components/producers/EditProfileDialog.vue'

export default {
  components: { EditProfileDialog },
  computed: {
    user() {
      return this.$store.getters['auth/user']
    },
    producer() {
      return this.$store.getters['producer/producer']
    },
    avatarSize() {
      return window.innerWidth > 600 ? 500 : 400
    }
  },
  data() {
    return {}
  },
  beforeCreate() {
    const slug = this.$route.params.slug
    this.$store.dispatch('producer/fetchProducer', slug)
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
  font-size: 4em;
}

.hey-text {
  font-size: 4em;
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

.loadingSpinner {
	position: absolute; 
  left: 0; 
  right: 0; 
  margin-left: auto; 
  margin-right: auto; 
  width: 100px;
}
</style>
