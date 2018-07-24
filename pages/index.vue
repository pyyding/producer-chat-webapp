<template>
  <v-layout column align-center>
    
  </v-layout>
</template>

<script>
  export default {
    data () {
      return {}
    },
    methods: {
      authWithGoogle: function () {
        this.$store.dispatch('auth/loginWithGoogle')
      }
    }
  }
</script>