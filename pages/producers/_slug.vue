<template>
	<v-container>
		<v-layout row mb-2>
			<v-flex xl3></v-flex>
			<v-flex xl9 ml-4>
				<h1>featured tracks</h1>
			</v-flex>
		</v-layout>
		<v-layout row>
			<v-flex xl3 >
				<v-card flat>
					<v-card-text>
						<v-layout row justify-center>
							<v-avatar size="72"><img :src="producer.photoURL" alt="avatar"></v-avatar>
						</v-layout>
						<v-layout row justify-center mt-3>
							<h3 class="text-xl-center">{{ producer.displayName }}</h3>
						</v-layout>
						<v-layout row justify-center mt-2>
							<p class="text--secondary"> {{ producer.bio }}</p>
						</v-layout>
						<v-layout justify-center row v-if="producer.soundcloud || producer.spotify || producer.bandcamp">
							<v-flex xl3>
								<v-layout row justify-center mt-2>
									<iframe v-if="producer.soundcloud" allowtransparency="true" scrolling="no" frameborder="no" :src="`https://w.soundcloud.com/icon/?url=${producer.soundcloud}&color=orange_white&size=32`" style="width: 32px; height: 32px;"/>
									<a v-if="producer.bandcamp" class="ml-2 mr-2 bandcamp-link" :href="producer.bandcamp" target="_blank">
										<img src="~/assets/bandcamp-black-32.png" style="height: 32px; width: 32px"/>
									</a>
									<iframe v-if="producer.spotify" :src="`https://open.spotify.com/follow/1/?uri=${producer.spotify}&size=basic&theme=light`" width="200" height="25" scrolling="no" frameborder="0" style="border:none; overflow:hidden;" allowtransparency="true"/>
								</v-layout>
							</v-flex>
						</v-layout>
					</v-card-text>
				</v-card>
			</v-flex>
			<v-flex ml-4 xl9>
				<v-layout row  v-for="(track, i) in producer.featuredTracks" :key="i" >
					<iframe class="mb-4" v-if="track.includes('soundcloud')" width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" :src="`https://w.soundcloud.com/player/?url=${track}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`"/>
					<iframe class="mb-4" v-if="track.includes('spotify')" :src="track" width="100%" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"/>
					<iframe class="mb-4" v-if="track.includes('clyp')" width="100%" height="166" :src="track" frameborder="0"></iframe>
				</v-layout>
			</v-flex>
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
			const slug = this.$route.params.slug
			this.$store.dispatch('producer/getProducer', slug)
		},
		methods: {
			signOut () {
				this.$store.dispatch('auth/signOut')
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.bandcamp-link
		cursor pointer
</style>