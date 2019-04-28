<template>
  <v-list-tile
    v-if="user"
    :to="`/${user.slug}`"
  >
    <v-list-tile-avatar>
      <img
        :src="user.photoURL"
        alt="avatar"
      >
    </v-list-tile-avatar>
    <v-list-tile-content>
      <v-list-tile-title>
        <h3 class="streak-item__title">
          {{ `${user.displayName}` }}
        </h3>
      </v-list-tile-title>
      <v-list-tile-sub-title class="streak-item__sub-title">
        <span class="tracks-chip d-inline-flex">
          <span
            v-if="user.streak > 0"
            class="streak-chip d-inline-flex mr-2"
          >
            <span class="streak-chip__icon">
              🔥
            </span>
            <span class="streak-chip__text">
              {{ user.streak }}
            </span>
          </span>
          <span class="streak-chip__icon">
            🎹
          </span>
          <span class="streak-chip__text">
            {{ user.totalTracks }}
          </span>
        </span>
      </v-list-tile-sub-title>
    </v-list-tile-content>
  </v-list-tile>
</template>

<script>
export default {
    props: {
        user: {
            type: Object,
            default: null
        }
    }
}
</script>

<style lang="stylus" scoped>
    @import '../assets/style/colors'

.streak-chip__text
    font-weight 600
    line-height 18px
    color $theme['blue']

.streak-chip__icon
    margin-right 5px

.streak-item__sub-title
    color initial !important

.streak-item__title
    font-weight 400
    color $theme['blue']
</style>
