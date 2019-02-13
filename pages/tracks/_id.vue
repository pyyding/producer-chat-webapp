<template>
  <v-container v-if="questionData">
    <v-layout>
      <v-flex>
        <track-card
          v-if="questionData.question"
          :question="questionData.question"/>
      </v-flex>
    </v-layout>
    <v-layout justify-center>
      <v-flex>
        <answer-form
          :question-id="questionID"
          :user="user"
          class="mt-4"/>
        <v-layout
          row
          mt-5>
          <v-flex v-if="questionData.answers">
            <div
              v-for="answer in questionData.answers"
              :key="answer.id"
              class="">
              <track-reply-card
                :answer="answer"
                :user="user"/>
            </div>
          </v-flex>
        </v-layout>
        <v-layout
          v-if="questionData.answers && questionData.answers.length === 0"
          row
          mt-5>
          <v-flex>
            <v-card
              v-if="questionData.question"
              height="300"
              flat
              color="grey lighten-4">
              <v-layout
                fill-height
                align-center
                text-sm-center>
                <v-card-text>
                  <h2>{{ questionData.question.user.displayName }} would be super thankful for your feedback!</h2>
                </v-card-text>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import TrackReplyForm from '~/components/tracks/TrackReplyForm.vue'
import TrackReplyCard from '~/components/tracks/TrackReplyCard.vue'
import TrackCard from '~/components/tracks/TrackCard.vue'
export default {
    components: { TrackReplyForm, TrackReplyCard, TrackCard },
    data() {
        return {}
    },
    computed: {
        user() {
            return this.$store.getters['auth/user']
        },
        questionData() {
            const data = this.$store.getters['tracks/questionData']
            if (data.question && data.question.id !== this.questionID) return
            return data
        }
    },
    beforeCreate() {
        this.questionID = this.$route.params.id
        this.$store.dispatch('tracks/getTrackData', this.questionID)
    }
}
</script>
