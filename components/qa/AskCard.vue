<template>
	<div>
		<v-btn color="primary" flat @click="extended = true">
			<v-icon left>create</v-icon> ask a question
		</v-btn>
		<v-card v-if="extended" color="" class="mt-2" flat>
			<v-slide-y-transition>
				<v-card-text>
					<v-form>
						<v-text-field required v-model="question.title" label="question *"/>
						<v-text-field append-icon="link" v-model="question.link" label="link (for context purposes)"/>
					</v-form>
				</v-card-text>
			</v-slide-y-transition>
			<v-card-actions v-if="extended">
				<v-spacer/>
				<v-btn @click="extended = false" color="error" flat>cancel</v-btn>
				<v-btn :loading="loading" @click="ask" color="primary" flat>ask</v-btn>
			</v-card-actions>
		</v-card>
	</div>
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