<template>
    <v-list-tile v-if="user">
        <v-list-tile-avatar>
            <img :src="user.photoURL" alt="avatar"/>
        </v-list-tile-avatar>
        <v-list-tile-content>
            <v-list-tile-title>
                <h3>{{user.displayName}}</h3>
            </v-list-tile-title>
            <v-list-tile-sub-title class="streak-item__sub-title">
                <span class="tracks-chip d-inline-flex">
                    <span class="streak-chip d-inline-flex mr-2" v-if="user.streak > 0">
                        <span class="streak-chip__icon">
                            🔥
                        </span>
                        <span class="streak-chip__text">
                            {{user.streak}}
                        </span>
                    </span>
                    <span class="streak-chip__icon">
                        🎹
                    </span>
                    <span class="streak-chip__text">
                        {{user.totalTracks}}
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
.streak-chip__text {
    color: black;
    font-weight: 600;
    line-height: 18px;
}

.streak-chip__icon {
    margin-right: 5px;
}

.streak-item__sub-title {
    color: initial !important;
}
</style>