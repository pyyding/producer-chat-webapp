  <template>
  <v-app class="background">
    <v-toolbar dark flat scroll-off-screen color="primary">
      <v-toolbar-title>
        <nuxt-link to="/">
          <img style="width: 230px; margin-top: 5px" src="/producer_chat_toolbar.svg">
        </nuxt-link>
      </v-toolbar-title>
      <v-spacer/>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn class="font-weight-bold" flat to="/feedback">
          <v-icon left small>question_answer</v-icon>
          feedback
        </v-btn>
        <v-btn class="font-weight-bold" v-if="user" flat :to="`/producers/${user.id}`">
          <v-avatar size="36px"><img :src="user.photoURL" alt="avatar"></v-avatar>
        </v-btn>
        <v-btn class="font-weight-bold" flat to="/login" v-if="!user">
          <v-icon left small>account_circle</v-icon>
          login
        </v-btn>
        <v-btn class="font-weight-bold" flat @click="signOut" v-if="user">
          <v-icon left small>power_settings_new</v-icon>
          sign out
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2018</span>
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
          { icon: 'bubble_chart', title: 'feedback', to: '/feedback' }
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
