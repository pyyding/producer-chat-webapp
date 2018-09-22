<template>
  <v-container>
    <v-layout row justify-center>
      <v-flex xl4>
        <v-card flat>
          <v-card-text class="pa-5">
            <h2 style="text-align: center">
              log in to producer chat.
            </h2>
            <v-layout column>
              <v-flex xs12 pt-3 class="text-xs-center">
                <p v-if="errorVisible">
                  This email account isn't part of Producer Chat community. Please fill
                  <a
                    class="warning--text"
                    target="_blank"
                    href="https://kasparpding.typeform.com/to/xHV1OG"
                  >our application
                  </a>
                  to join the chat.
                </p>
              </v-flex>
              <v-flex class="d-flex">
                <v-spacer/>
                <v-btn :loading="loading" class="mt-5 text-xl-center" color="primary" flat @click="authWithGoogle">
                  sign in with Google
                </v-btn>
                <v-spacer/>
              </v-flex>
            </v-layout>
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
        loading: false,
        errorVisible: false
      }
    },
    watch: {
  		user: function (prevValue, newValue) {
  			this.$router.push('/feedback')
      }
    },
    methods: {
			authWithGoogle: function () {
				this.loading = true
				this.$store.dispatch('auth/loginWithGoogle')
          .then(() => {
          	this.loading = false
          })
          .catch((error) => {
          	this.errorVisible = true
            this.loading = false
          })
			}
    }
  }
</script>
