<template>
  <div class="subheader">
    <v-spacer />
    <app-subheader-property
      key-text="streak"
      :value="`🔥 ${user.streak}`"
      tooltip-text="check in daily to earn a streak"
    />
    <app-subheader-property
      key-text="tracks"
      :value="`🎹 ${user.totalTracks}`"
      tooltip-text="number of posted tracks"
    />
  </div>
</template>

<script>
import AppSubheaderProperty from '~/components/AppSubheaderProperty'

export default {
    components: {
        AppSubheaderProperty
    },
    computed: {
        user() {
            return this.$store.getters['auth/user']
        }
    }
}
</script>

<style lang="stylus" scoped>
    .subheader
        height 25px
        background-color #354851
        display inline-flex
        padding 0 50px
        align-items center
</style>
