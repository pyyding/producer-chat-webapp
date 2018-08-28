<template>
  <v-container>
    <v-layout row justify-center>
      <v-flex xl4>
        <v-card flat>
          <v-card-text class="pa-5">
            <h2 style="text-align: center">
              log in to producer chat.
            </h2>
            <v-card-actions>
              <v-spacer/>
                <v-btn class="mt-5 text-xl-center" color="primary" flat @click="authWithGoogle">
                  sign in with Google
                </v-btn>
              <v-spacer/>
            </v-card-actions>
          </v-card-text>
        </v-card>
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
  			this.$router.push('/ask')
      }
    },
    methods: {
			authWithGoogle: function () {
				this.$store.dispatch('auth/loginWithGoogle')
			}
    }
  }
</script>