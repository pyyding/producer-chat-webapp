<template>
  <div>
    <v-card
      v-if="visible"
      color=""
      class="mb-2"
      flat>
      <v-slide-y-transition>
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="question.link"
              required
              append-icon="link"
              label="track link (public soundcloud or clyp.it)"/>
          </v-form>
        </v-card-text>
      </v-slide-y-transition>
      <v-card-actions v-if="visible">
        <v-spacer/>
        <v-btn
          color="grey"
          flat
          @click="visible = false">cancel</v-btn>
        <v-btn
          :loading="loading"
          color="primary"
          flat
          @click="ask">post</v-btn>
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
            createdAt: null
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
        ask() {
            this.loading = true
            this.question.createdAt = fb.serverTimestamp()
            this.question.user = {
                id: this.user.id,
                displayName: this.user.displayName,
                photoURL: this.user.photoURL
            }
            this.$store.dispatch('qa/ask', this.question).then(() => {
                this.visible = false
                this.loading = false
            })
        }
    }
}
</script>

<style scoped lang="stylus">
.ask-card--cta {
	cursor: pointer;
}
</style>
