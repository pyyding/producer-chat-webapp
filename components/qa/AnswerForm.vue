<template>

	<v-card>
		<v-card-text>
			<v-layout row>
				<v-flex>
					<v-textarea v-model="answerText"/>
				</v-flex>
			</v-layout>
			<v-layout row >
				<v-btn @click="submit" class="ml-0" color="success" flat>Submit</v-btn>
			</v-layout>
		</v-card-text>
	</v-card>
</template>

<script>
	export default {
		props: ['questionID', 'user'],
		data () {
			return {
				answerText: ''
			}
		},
		methods: {
			submit () {
				const answerObject = {
					text: this.answerText,
					createdAt: new Date(),
					user: {
						id: this.user.id,
						displayName: this.user.displayName,
						photoURL: this.user.photoURL
					},
					questionID: this.questionID
				}
				this.$store.dispatch('qa/submitAnswer', answerObject)
					.then(() => { this.answerText = '' })
			}
		}
	}
</script>