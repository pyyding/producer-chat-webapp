<template>
  <v-container fluid>
    <v-layout row>
      <v-flex>
        <v-layout row>
          <v-flex xl6>
            <track-form />
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex
            xl6
            align-center
          >
            <track-card
              v-for="question in questions"
              :key="question.id"
              :question="question"
            />
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import TrackCard from '~/components/tracks/TrackCard'
import TrackForm from '~/components/tracks/TrackForm'

export default {
    components: { TrackCard, TrackForm },
    computed: {
        questions() {
            return this.$store.getters['tracks/questions']
        }
    },
    beforeCreate() {
        this.$store.dispatch('tracks/getTracks')
    }
}
</script>

<style lang="stylus" scoped></style>
