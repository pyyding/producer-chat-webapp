<template>
  <v-container>
    <v-layout
      row
      justify-center
    >
      <v-flex xl4>
        <v-card flat>
          <v-card-text class="pa-5">
            <h2 style="text-align: center">
              log in to producer chat.
            </h2>
            <v-layout column>
              <v-flex
                xs12
                pt-3
                class="text-xs-center"
              />
              <v-flex
                v-if="!showCheckEmailLabel && !showRedirecting"
                class="d-flex"
              >
                <v-spacer />
                <v-form
                  v-model="valid"
                  class="form"
                >
                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    type="email"
                    label="Enter your email address"
                    @keyup.native.enter="authWithEmail"
                  />
                </v-form>
                <v-spacer />
              </v-flex>
              <v-flex
                v-if="!showCheckEmailLabel && !showRedirecting"
                class="d-flex"
              >
                <v-spacer />
                <v-btn
                  :loading="loading"
                  class="mt-5"
                  color="primary"
                  style="width: 50px"
                  depressed
                  @click="authWithEmail"
                >
                  sign in
                </v-btn>
                <v-spacer />
              </v-flex>
              <v-layout
                v-if="!showCheckEmailLabel && !showRedirecting"
                row
              >
                <v-spacer />
                <p
                  class="text--grey mt-3 text-xs-center"
                  style="width: 300px"
                >
                  <a
                    href="https://www.producer.chat/welcome#sign-up"
                  >sign up</a>
                </p>
                <v-spacer />
              </v-layout>
              <v-layout
                v-if="showCheckEmailLabel"
                row
              >
                <v-spacer />Login link has been sent to your email!
                <v-spacer />
              </v-layout>
              <v-layout
                v-if="showRedirecting"
                row
              >
                <v-spacer />redirecting...
                <v-spacer />
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
    data() {
        return {
            email: '',
            loading: false,
            errorVisible: false,
            showCheckEmailLabel: false,
            showRedirecting: false,
            valid: true,
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid'
            ]
        }
    },
    computed: {
        user() {
            return this.$store.getters['auth/user']
        }
    },
    watch: {
        user: function(newValue, prevValue) {
            const userHasFilledInfo =
                'soundcloud' in newValue ||
                'bandcamp' in newValue ||
                'bio' in newValue ||
                'spotify' in newValue ||
                'youtube' in newValue ||
                'instagram' in newValue
            if (!userHasFilledInfo) {
                this.$router.push(`/${newValue.slug}?openDialog=true`)
                return
            }
            this.$router.push('/activity')
        }
    },
    mounted() {
        if (fb.firebase.auth().isSignInWithEmailLink(window.location.href)) {
            let email = window.localStorage.getItem('emailForSignIn')
            if (!email) {
                email = window.prompt(
                    'Please provide your email for confirmation'
                )
            }
            this.showRedirecting = true
            fb.firebase
                .auth()
                .signInWithEmailLink(email, window.location.href)
                .then(function(result) {
                    window.localStorage.removeItem('emailForSignIn')
                })
                .catch(function(error) {
                    console.error(error)
                })
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
.form {
  max-width: 350px;
}
</style>
