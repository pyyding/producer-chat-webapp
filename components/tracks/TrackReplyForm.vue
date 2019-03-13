<template>
  <div>
    <v-card
      v-if="user"
      flat
      color=""
    >
      <v-card-text>
        <v-layout row>
          <v-flex>
            <v-textarea
              v-model="answerText"
              label="Write your feedback here..."
            />
          </v-flex>
        </v-layout>
        <v-layout row>
          <h4>sounds dope?</h4>
          <v-rating
            v-model="rating"
            color="secondary"
          />
        </v-layout>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          class="ml-0"
          color="success"
          flat
          @click="submit"
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
    props: {
        questionID: {
            type: String,
            default: null
        },
        user: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            showForm: true,
            answerText: '',
            rating: 1
        }
    },
    methods: {
        setRating(rating) {
            this.rating = rating
        },
        submit() {
            const answerObject = {
                text: this.answerText,
                rating: this.rating,
                createdAt: fb.serverTimestamp(),
                user: {
                    id: this.user.id,
                    displayName: this.user.displayName,
                    photoURL: this.user.photoURL
                },
                questionID: this.questionID,
                voteSum: 0
            }
            this.$store
                .dispatch('tracks/postTrackReply', answerObject)
                .then(() => {
                    this.answerText = ''
                })
        }
    }
}
</script>
