<template>
  <v-layout centered>
    <v-card width="500px">
      <v-card-title>

      </v-card-title>
      <v-card-text>
        <v-btn color="primary" @click="authWithGoogle">
          Sign in with Google
        </v-btn>
      </v-card-text>
    </v-card>
  </v-layout>
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