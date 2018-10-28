<template>
	<div>
		<v-btn v-if="user" color="primary" depressed @click="extended = true">
			🎹 post a track
		</v-btn>
		<v-card v-if="extended" color="" class="mt-2" flat>
			<v-slide-y-transition>
				<v-card-text>
					<v-form>
						<v-text-field required append-icon="link" v-model="question.link" label="link (public soundcloud or clyp.it link)*"/>
					</v-form>
				</v-card-text>
			</v-slide-y-transition>
			<v-card-actions v-if="extended">
				<v-spacer/>
				<v-btn @click="extended = false" color="grey" flat>cancel</v-btn>
				<v-btn :loading="loading" @click="ask" color="primary" flat>post</v-btn>
			</v-card-actions>
		</v-card>
	</div>
</template>

<script>
	export default {
		computed: {
			user () {
				return this.$store.getters['auth/user']
			}
		},
		data () {
			return {
				extended: false,
				question: {
					title: '',
					link: '',
					user: {},
					ratingAvg: 0
				},
				createdAt: null
			}
		},
		methods: {
			ask () {
				this.loading = true
				this.question.createdAt = new Date()
				this.question.user = {
					id: this.user.id,
					displayName: this.user.displayName,
					photoURL: this.user.photoURL
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
