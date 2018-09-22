<template>
	<div>
		<v-icon :color="color" :small="small" >{{ rating === 0  ? 'star_border' : rating >= 1 ? 'star' : 'star_half' }}</v-icon>
		<v-icon :small="small">{{ rating < 1  ? 'star_border' : rating >= 2 ? 'star' : 'star_half' }}</v-icon>
		<v-icon :small="small">{{ rating < 2  ? 'star_border' : rating >= 3 ? 'star' : 'star_half' }}</v-icon>
		<v-icon :small="small">{{ rating < 3  ? 'star_border' : rating >= 4 ? 'star' : 'star_half' }}</v-icon>
		<v-icon :small="small">{{ rating < 4  ? 'star_border' : rating === 5 ? 'star' : 'star_half' }}</v-icon>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				rating: 2.1,
				small: true,
				color:
			}
		}
	}
</script>

<style scoped lang="stylus">

</style>
