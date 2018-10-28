<template>
  <v-container>
    <v-layout row justify-center>
      <v-flex xl4>
        <v-card flat>
          <v-card-text class="pa-5">
            <h2 style="text-align: center">
              log in to producer chat.
            </h2>
            <v-layout row>
              <v-spacer/>
              <p class="text--grey mt-3 text-xs-center" style="width: 300px">
                We're currently in beta and accept only limited amount of users. <a target="_blank" href="https://producerchat.typeform.com/to/bmYm9d">Apply to be a beta tester</a>
              </p>
              <v-spacer/>
            </v-layout>
            <v-layout column>
              <v-flex xs12 pt-3 class="text-xs-center">
                <p v-if="errorVisible">
                  This email account isn't part of Producer Chat community. Please fill
                  <a
                    class="warning--text"
                    target="_blank"
                    href="https://producerchat.typeform.com/to/bmYm9d"
                  >the beta tester application
                  </a>
                  to join the chat.
                </p>
              </v-flex>
              <v-flex class="d-flex">
                <v-spacer/>
                <v-btn
                  :loading="loading"
                  class="mt-5"
                  color="white"
                  style="width: 50px"
                  @click="authWithGoogle"
                >
                  sign in with <img class="ml-2" style="height: 20px" :src="require('assets/btn_google_light_normal_ios.svg')">
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
  			this.$router.push('/tracks')
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
