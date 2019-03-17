<template>
  <div>
    <v-card
      v-if="visible"
      color=""
      class="mb-2"
      flat
    >
      <v-slide-y-transition>
        <v-card-text>
          <v-form v-model="valid">
            <v-text-field
              v-model="question.link"
              :rules="linkRules"
              required
              append-icon="link"
              label="public soundcloud link"
            />
          </v-form>
        </v-card-text>
      </v-slide-y-transition>
      <v-card-actions v-if="visible">
        <v-spacer />
        <v-btn
          color="grey"
          flat
          @click="visible = false"
        >
          cancel
        </v-btn>
        <v-btn
          :loading="loading"
          color="primary"
          flat
          @click="postTrack"
        >
          post
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import fb from '~/plugins/firebase'

export default {
    data() {
        return {
            visible: false,
            question: {
                title: '',
                link: '',
                user: {},
                ratingAvg: 0
            },
            createdAt: null,
            valid: true,
            linkRules: [
                v => !!v || 'link is required',
                v =>
                    /.+soundcloud.+/.test(v) ||
                    'must be a valid soundcloud link'
            ]
        }
    },
    computed: {
        user() {
            return this.$store.getters['auth/user']
        }
    },
    methods: {
        show() {
            this.visible = true
        },
        hide() {
            this.visible = false
        },
        postTrack() {
            this.loading = true
            this.question.createdAt = fb.serverTimestamp()
            this.question.user = {
                id: this.user.id,
                slug: this.user.slug,
                displayName: this.user.displayName,
                photoURL: this.user.photoURL
            }
            this.$store.dispatch('tracks/postTrack', this.question).then(() => {
                this.visible = false
                this.loading = false
            })
        }
    }
}
</script>

<style scoped lang="stylus">
.track-form--cta {
	cursor: pointer;
}
</style>
