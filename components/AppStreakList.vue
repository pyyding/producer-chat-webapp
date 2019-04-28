<template>
  <v-card
    v-if="topUsers.length > 0"
    flat
    style="width: 100%"
    class="streak-card"
  >
    <v-card-title class="title-wrapper">
      <h2 class="card-title">
        streaks
      </h2>
    </v-card-title>
    <v-card-text class="text-wrapper">
      <v-list
        two-line
        class="streak-list"
      >
        <template v-for="user in topUsers">
          <app-streak-list-item
            :key="user.id"
            :user="user"
          />
        </template>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import AppStreakListItem from '~/components/AppStreakListItem'

export default {
    components: { AppStreakListItem },
    computed: {
        topUsers() {
            return this.$store.getters.topUsers
        }
    },
    beforeCreate() {
        this.$store.dispatch('fetchTopUsers')
    }
}
</script>

<style lang="stylus" scoped>
@import '../assets/style/colors';

.streak-card
    padding-bottom 0
.card-title
    color $theme['blue']
.title-wrapper
    padding 10px 16px
.text-wrapper
    padding 0
.streak-list
    padding 0
</style>
