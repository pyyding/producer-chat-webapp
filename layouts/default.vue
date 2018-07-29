<template>
  <v-app class="background">
    <v-toolbar>
      <v-spacer/>
      <v-avatar v-if="user" class="mr-2" size="36px"><img :src="user.photoURL72" alt="avatar"></v-avatar>
      <v-btn flat v-if="user" @click="signOut">Sign Out</v-btn>
    </v-toolbar>
    <v-navigation-drawer
      class="blue lighten-2"
      dark
      flat
      permanent
      :mini-variant.sync="miniVariant"
      v-model="drawer"
      fixed
      app
    >
      <v-list>
        <v-list-tile
          router
          :to="item.to"
          :key="i"
          v-for="(item, i) in items"
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
  	computed: {
      user () {
        return this.$store.getters['auth/user']
      }
    },
    data () {
      return {
        drawer: true,
        fixed: false,
        items: [
          { icon: 'apps', title: 'Dashboard', to: '/dashboard' },
          { icon: 'bubble_chart', title: 'Q&A', to: '/qa' }
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'producer.chat'
      }
    },
    methods: {
  		signOut () {
  			this.$store.dispatch('auth/signOut')
      }
    }
  }
</script>

<style lang="stylus" scoped>

</style>
