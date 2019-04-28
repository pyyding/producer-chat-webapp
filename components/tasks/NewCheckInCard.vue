<template>
  <v-card
    v-if="visible"
    color="transparent"
    flat
    class="mb-2"
  >
    <v-card-text>
      <v-form>
        <v-layout column>
          <v-text-field
            v-model="newCheckInText"
            placeholder="finished a beat, a remix or practiced an instrument? (optional)"
            @keyup.native.enter="post"
          />
        </v-layout>
      </v-form>
    </v-card-text>
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
        color="secondary"
        depressed
        @click="post"
      >
        submit
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import fb from '~/plugins/firebase'

export default {
    data() {
        return {
            visible: false,
            newCheckInText: '',
            isDone: false,
            loading: false
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
        post() {
            const checkIn = {
                text: this.newCheckInText,
                user: {
                    id: this.user.id,
                    slug: this.user.slug,
                    displayName: this.user.displayName,
                    photoURL: this.user.photoURL
                },
                createdAt: fb.serverTimestamp(),
                doneAt: fb.serverTimestamp(),
                isDone: true
            }
            this.$store.dispatch('tasks/createCheckIn', checkIn)
            this.$notify({
                group: 'checkin',
                title: "You're checked in for today, see you tomorrow!",
                type: 'success',
                duration: 6000
            })
            this.newCheckInText = ''
            this.visible = false
        }
    }
}
</script>

<style scoped lang="stylus">
.track-form--cta {
  cursor: pointer;
}
</style>
