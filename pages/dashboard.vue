<template>
	<v-layout>
		<h1>Dashboard</h1>
	</v-layout>
</template>

<script>
	export default {
		middleware: 'is-authenticated',
		data () {
			return {

			}
		}
	}
</script>