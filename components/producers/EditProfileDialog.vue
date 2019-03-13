<template>
  <v-dialog
    v-model="isVisible"
    max-width="600px"
  >
    <v-btn
      slot="activator"
      class="edit-button"
      icon
      @click="isVisible = true"
    >
      <v-icon>edit</v-icon>
    </v-btn>

    <v-card>
      <v-container grid-list-md>
        <v-card-title>
          <h1>edit profile</h1>
        </v-card-title>

        <v-form @keyup.native.enter="edit">
          <v-card-text>
            <v-flex
              mb-2
              xs12
            >
              <span
                class="secondary--text"
              >to edit your name or profile pic, do the
                changes in Slack</span>
            </v-flex>
            <v-layout wrap>
              <v-flex>
                <v-textarea
                  v-model="editData.bio"
                  :rows="2"
                  label="Write your bio here"
                  box
                  required
                />
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="editData.soundcloud"
                  type="link"
                  label="SoundCloud link"
                />
                <v-text-field
                  v-model="editData.instagram"
                  type="link"
                  label="Instagram link"
                />
                <v-text-field
                  v-model="editData.youtube"
                  type="link"
                  label="YouTube link"
                />
                <v-text-field
                  v-model="editData.spotify"
                  type="link"
                  label="Spotify link"
                />
                <v-text-field
                  v-model="editData.bandcamp"
                  type="link"
                  label="Bandcamp link"
                />
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              :loading="isLoading"
              depressed
              color="primary"
              @click="edit"
            >
              save
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
    props: {
        producer: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            isVisible: false,
            isLoading: false,
            editData: {}
        }
    },
    mounted() {
        this.editData = {
            bio: this.producer.bio || '',
            soundcloud: this.producer.soundcloud || '',
            instagram: this.producer.instagram || '',
            youtube: this.producer.youtube || '',
            spotify: this.producer.spotify || '',
            bandcamp: this.producer.bandcamp || ''
        }
    },
    methods: {
        async edit() {
            this.isLoading = true
            await this.$store.dispatch('producer/edit', {
                id: this.producer.id,
                data: this.editData
            })
            this.isVisible = false
            this.isLoading = false
        }
    }
}
</script>

<style>
</style>
