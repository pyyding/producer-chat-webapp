<template>
	<div>
		<v-card v-if="user" flat color="">
			<v-card-text>
				<v-layout row>
					<v-flex>
						<v-textarea label="Write your feedback here..." v-model="answerText"/>
					</v-flex>
				</v-layout>
				<v-layout row>
					<h4>sounds dope?</h4>
					<v-btn @click="setRating(1)" icon><v-icon>{{ rating >= 1 ? 'star' : 'star_border'}}</v-icon></v-btn>
					<v-btn @click="setRating(2)" icon><v-icon>{{ rating >= 2 ? 'star' : 'star_border'}}</v-icon></v-btn>
					<v-btn @click="setRating(3)" icon><v-icon>{{ rating >= 3 ? 'star' : 'star_border'}}</v-icon></v-btn>
					<v-btn @click="setRating(4)" icon><v-icon>{{ rating >= 4 ? 'star' : 'star_border'}}</v-icon></v-btn>
					<v-btn @click="setRating(5)" icon><v-icon>{{ rating >= 5 ? 'star' : 'star_border'}}</v-icon></v-btn>
				</v-layout>
			</v-card-text>
			<v-card-actions>
				<v-spacer/>
				<v-btn @click="showForm = false" color="error" flat>cancel</v-btn>
				<v-btn @click="submit" class="ml-0" color="success" flat>post</v-btn>
			</v-card-actions>
		</v-card>
	</div>
</template>

<script>
	export default {
		props: ['questionID', 'user'],
		data () {
			return {
				showForm: true,
				answerText: '',
				rating: 1
			}
		},
		methods: {
			setRating (rating) {
				this.rating = rating
			},
			submit () {
				const answerObject = {
					text: this.answerText,
					rating: this.rating,
					createdAt: new Date(),
					user: {
						id: this.user.id,
						displayName: this.user.displayName,
						photoURL: this.user.photoURL
					},
					questionID: this.questionID,
					voteSum: 0
				}
				this.$store.dispatch('qa/submitAnswer', answerObject)
					.then(() => { this.answerText = '' })
			}
		}
	}
</script>
