<template>
  <v-container>
    <v-layout row>
      <v-flex xs10>
        <h2>
          Log in to view your dashboard
        </h2>
        <v-btn class="mt-4" color="primary" @click="authWithGoogle">
          Sign in with Google
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
  	computed: {
  		user () { return this.$store.getters['auth/user'] }
    },
  	data () {
  		return {

      }
    },
    watch: {
  		user: function (prevValue, newValue) {
  			this.$router.push('/dashboard')
      }
    },
    methods: {
			authWithGoogle: function () {
				this.$store.dispatch('auth/loginWithGoogle')
			}
    }
  }
</script>