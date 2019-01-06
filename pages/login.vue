<template>
  <v-container>
    <v-layout row justify-center>
      <v-flex xl4>
        <v-card flat>
          <v-card-text class="pa-5">
            <h2 style="text-align: center">log in to producer chat.</h2>
            <v-layout column>
              <v-flex xs12 pt-3 class="text-xs-center">
                <p v-if="errorVisible">
                  This email account isn't part of Producer Chat community. Please fill
                  <a
                    class="warning--text"
                    target="_blank"
                    href="https://producerchat.typeform.com/to/bmYm9d"
                  >sign up application</a>
                  to join the community.
                </p>
              </v-flex>
                <v-flex class="d-flex" v-if="!showCheckEmailLabel && !showRedirecting">
                  <v-spacer/>
                  <v-text-field
                    type="email"
                    class="email-input"
                    v-model="email"
                    label="Enter your email address"
                    @keyup.native.enter="authWithEmail"
                  />
                  <v-spacer/>
                </v-flex>
                <v-flex class="d-flex" v-if="!showCheckEmailLabel && !showRedirecting">
                  <v-spacer/>
                  <v-btn
                    :loading="loading"
                    class="mt-5"
                    color="primary"
                    style="width: 50px"
                    @click="authWithEmail"
                    depressed
                  >sign in</v-btn>
                  <v-spacer/>
                </v-flex>
              <v-layout row v-if="!showCheckEmailLabel && !showRedirecting">
                <v-spacer/>
                <p class="text--grey mt-3 text-xs-center" style="width: 300px">
                  <a target="_blank" href="https://producerchat.typeform.com/to/bmYm9d">sign up</a>
                </p>
                <v-spacer/>
              </v-layout>
              <v-layout row v-if="showCheckEmailLabel">
                <v-spacer/>go check your email!
                <v-spacer/>
              </v-layout>
              <v-layout row v-if="showRedirecting">
                <v-spacer/>redirecting...
                <v-spacer/>
              </v-layout>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import fb from '~/plugins/firebase'

export default {
  mounted() {
    if (fb.firebase.auth().isSignInWithEmailLink(window.location.href)) {
      // Additional state parameters can also be passed via URL.
      // This can be used to continue the user's intended action before triggering
      // the sign-in operation.
      // Get the email if available. This should be available if the user completes
      // the flow on the same device where they started it.
      var email = window.localStorage.getItem('emailForSignIn')
      if (!email) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again. For example:
        email = window.prompt('Please provide your email for confirmation')
      }
      this.showRedirecting = true
      // The client SDK will parse the code from the link for you.
      fb.firebase
        .auth()
        .signInWithEmailLink(email, window.location.href)
        .then(function(result) {
          // Clear email from storage.
          window.localStorage.removeItem('emailForSignIn')
          // You can access the new user via result.user
          // Additional user info profile not available via:
          // result.additionalUserInfo.profile == null
          // You can check if the user is new or existing:
          // result.additionalUserInfo.isNewUser
        })
        .catch(function(error) {
          // Some error occurred, you can inspect the code: error.code
          // Common errors could be invalid email and invalid or expired OTPs.
          console.error(error)
        })
    }
  },
  computed: {
    user() {
      return this.$store.getters['auth/user']
    }
  },
  data() {
    return {
      email: '',
      loading: false,
      errorVisible: false,
      showCheckEmailLabel: false,
      showRedirecting: false
    }
  },
  watch: {
    user: function(prevValue, newValue) {
      this.$router.push('/activity')
    }
  },
  methods: {
    authWithEmail: function() {
      this.loading = true
      this.$store
        .dispatch('auth/loginWithEmail', this.email)
        .then(() => {
          this.showCheckEmailLabel = true
          this.loading = false
        })
        .catch(error => {
          this.errorVisible = true
          this.loading = false
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
.email-input {
  max-width: 300px;
}
</style>
