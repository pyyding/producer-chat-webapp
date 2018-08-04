<template>
	<v-container>
		<v-layout row>
			<v-btn flat @click="signOut">Sign Out</v-btn>
		</v-layout>
		<v-layout row>
				coming soon...
		</v-layout>
	</v-container>

</template>

<script>
	export default {
		computed: {
			producer () { return this.$store.getters['producer/producer'] }
		},
		data () {
			return {}
		},
		beforeCreate () {
			const id = this.$route.params.id
			this.$store.dispatch('producer/getProducerData', id)
		},
		methods: {
			signOut () {
				this.$store.dispatch('auth/signOut')
			}
		}
	}
</script>