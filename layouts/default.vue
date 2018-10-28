  <template>
  <v-app class="background">
    <v-toolbar dark flat scroll-off-screen color="primary">
      <v-toolbar-title>
        <nuxt-link to="/tracks">
          <img class="toolbar__logo hidden-xs-only" src="/toolbar_logo.svg">
          <img class="toolbar__logo--small hidden-sm-and-up" src="/toolbar_logo_small.svg">
        </nuxt-link>
      </v-toolbar-title>
      <v-spacer/>
      <v-toolbar-items >
        <v-btn class="font-weight-bold" flat to="/tracks">
          <v-icon left small>question_answer</v-icon>
          tracks
        </v-btn>
        <v-btn v-if="user" class="font-weight-bold" flat :to="'/producers/' + user.id + '/tasks'">
          <v-icon left small>check_circle</v-icon>
          my tasks
        </v-btn>
        <v-menu
          offset-y
          v-if="user"
        >
          <v-btn
            class="font-weight-bold"
            flat
            slot="activator"
          >
            <v-avatar size="36px"><img :src="user.photoURL" alt="avatar"></v-avatar>
          </v-btn>
          <v-list>
            <v-list-tile
              @click="signOut"
            >
              <v-list-tile-title>Sign out</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
        <v-btn class="font-weight-bold" flat to="/login" v-if="!user">
          <v-icon left small>account_circle</v-icon>
          login
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span class="ml-4">Producer Chat &copy; 2018</span>
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
  .toolbar__logo
    width 230px
    margin-top: 5px
  .toolbar__logo--small
    width: 30px;
    margin-top: 5px;
</style>
