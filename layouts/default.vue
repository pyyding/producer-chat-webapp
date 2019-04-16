<template>
  <v-app class="background">
    <v-toolbar
      dense
      dark
      flat
      scroll-off-screen
      color="primary"
    >
      <v-toolbar-title>
        <nuxt-link to="/activity">
          <img
            class="toolbar__logo hidden-xs-only"
            src="/toolbar_logo.svg"
          >
          <img
            class="toolbar__logo--small hidden-sm-and-up"
            src="/toolbar_logo_small.svg"
          >
        </nuxt-link>
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <v-btn
          class="font-weight-bold"
          flat
          to="/activity"
        >
          <v-icon
            left
            small
          >
            web
          </v-icon>
          activity
        </v-btn>
        <v-menu
          v-if="user"
          offset-y
        >
          <v-btn
            slot="activator"
            class="font-weight-bold"
            flat
          >
            <v-avatar
              size="36px"
            >
              <img
                :src="user.photoURL"
                alt="avatar"
              >
            </v-avatar>
          </v-btn>
          <v-list>
            <v-list-tile :to="`/${user.slug}`">
              my profile
            </v-list-tile>
            <v-list-tile @click="signOut">
              <v-list-tile-title>sign out</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
        <v-btn
          v-if="!user"
          class="font-weight-bold"
          flat
          to="/login"
        >
          <v-icon
            left
            small
          >
            account_circle
          </v-icon>
          login
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer
      height="10px"
      absolute
      app
    >
      <span class="ml-4">Producer Chat &copy; 2018</span>
    </v-footer>
    <notifications
      group="notifications"
      position="bottom right"
    />
  </v-app>
</template>

<script>
export default {
    data() {
        return {
            drawer: true,
            fixed: false,
            miniVariant: false,
            right: true,
            rightDrawer: false,
            title: 'producer.chat'
        }
    },
    computed: {
        user() {
            return this.$store.getters['auth/user']
        }
    },
    methods: {
        signOut() {
            this.$store.dispatch('auth/signOut')
        }
    }
}
</script>

<style lang="stylus" scoped>
@import '../assets/style/colors';

.background {
  background: $theme['bg-grey'];
}

.toolbar__logo {
  width: 230px;
  margin-top: 5px;
}

.toolbar__logo--small {
  width: 30px;
  margin-top: 5px;
}

.theme--light.v-footer {
  background-color: $theme['bg-grey'];
  height: 20px;
  min-height: 20px;
  font-size: 12px;
}

@media (max-width: 768px) {
  .v-toolbar .v-btn {
    padding: 0 5px;
  }
}
</style>
