<template>
  <v-layout column align-center>

  </v-layout>
</template>

<script>
  export default {
    data () {
      return {}
    },
		computed: {
			user () { return this.$store.getters['auth/user']}
		},
    methods: {
    },
    beforeCreate () {
      this.$router.push('/feedback')
		}
  }
</script>
