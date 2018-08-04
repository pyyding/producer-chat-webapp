<template>
  <v-app class="background">
    <v-toolbar dark dense flat>
      <v-toolbar-title>
        producer chat
      </v-toolbar-title>
      <v-spacer/>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat to="/ask">
          <v-icon left small>question_answer</v-icon>
          ask
        </v-btn>
        <v-btn v-if="user" flat :to="`/producers/${user.id}`">
          <v-avatar size="36px"><img :src="user.photoURL" alt="avatar"></v-avatar>
        </v-btn>
        <v-btn flat to="/login" v-if="!user">
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
          { icon: 'bubble_chart', title: 'ask', to: '/ask' }
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'producer.chat'
      }
    },
    methods: {
    }
  }
</script>

<style lang="stylus" scoped>

</style>
