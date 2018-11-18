<template>
    <v-card flat style="width: 100%">
        <v-card-title >
            <h2>top producers</h2>
        </v-card-title>
        <v-card-text>
            <v-list two-line>
                <template v-for="user in topUsers">
                    <app-streak-list-item 
                    :user="user"
                    :key="user.id"
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

<style>
</style>
