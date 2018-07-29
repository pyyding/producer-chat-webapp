<template>
	<v-card color="" class="mt-2" flat>
		<v-card-title v-if="!extended">
			<h2 class="blue--text ask-card--cta" @click="extended = true">
				Ask a Question
			</h2>
			<v-spacer/>
		</v-card-title>
		<v-slide-y-transition>
			<v-card-text v-if="extended">
				<v-form>
					<v-text-field required v-model="question.title" label="Question *"/>
					<v-text-field append-icon="link" v-model="question.link" label="link (for context purposes)"/>
				</v-form>
			</v-card-text>
		</v-slide-y-transition>
		<v-card-actions v-if="extended">
			<v-btn :loading="loading" @click="ask" color="primary" flat>ASK</v-btn>
			<v-btn @click="extended = false" color="error" flat>Cancel</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
	export default {
		data () {
			return {
				extended: false,
				question: {
					title: '',
					link: '',
					user: {}
				},
				createdAt: null
			}
		},
		methods: {
			ask () {
				this.loading = true
				const user = this.$store.getters['auth/user']

				this.question.createdAt = new Date()
				this.question.user = {
					id: user.id,
					displayName: user.displayName,
					photoURL: user.photoURL,
				}
				this.$store.dispatch('qa/ask', this.question)
					.then(() => {
						this.extended = false
						this.loading = false
					})
			}
		}
	}
</script>

<style scoped lang="stylus">
	.ask-card--cta
		cursor pointer
</style>