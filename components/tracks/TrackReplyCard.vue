<template>
  <v-card
    v-if="answer"
    flat
    class="mb-2"
  >
    <v-card-text>
      <v-layout
        row
        align-center
      >
        <v-avatar
          class="ml-2 mr-2"
          size="36px"
        >
          <img
            :src="answer.user.photoURL"
            alt="avatar"
          >
          />
        </v-avatar>

        <div>
          <strong>{{ answer.user.displayName }}</strong>
          <div>
            <span class="grey--text">{{
              answer.createdAt.toDate().toLocaleDateString()
            }}</span>
          </div>
        </div>
        <v-btn
          v-if="user && user.id === answer.user.id"
          title="delete feedback"
          icon
          @click="deleteTrackReply"
        >
          <v-icon
            color="grey"
            small
          >
            clear
          </v-icon>
        </v-btn>
      </v-layout>
      <v-layout row>
        <div class="vote-widget">
          <v-btn
            small
            icon
            @click="castVote(true)"
          >
            <v-icon
              :class="{
                'success--text': userVote && userVote.isUpvote
              }"
            >
              arrow_drop_up
            </v-icon>
          </v-btn>
          <h2 class="vote-widget__count">
            {{ temporaryVoteSum || answer.voteSum }}
          </h2>
          <v-btn
            small
            icon
            @click="castVote(false)"
          >
            <v-icon
              :class="{
                'success--text': userVote && !userVote.isUpvote
              }"
            >
              arrow_drop_down
            </v-icon>
          </v-btn>
        </div>
        <v-flex pt-3>
          <p class="answer--text subheading">
            {{ answer.text }}
          </p>
          <v-flex
            v-for="reply in replies"
            :key="reply.id"
          >
            <v-divider class="mb-2 mt-2 grey lighten-4" />
            <v-layout align-center>
              <v-flex>
                <strong class="">{{
                  reply.user.displayName
                }}</strong><span class=""> {{ reply.text }}</span>
              </v-flex>
              <v-btn
                v-if="user && user.id === reply.user.id"
                small
                icon
                title="delete reply"
                @click="deleteReply(reply)"
              >
                <v-icon
                  color="grey"
                  small
                >
                  clear
                </v-icon>
              </v-btn>
            </v-layout>
          </v-flex>
        </v-flex>
      </v-layout>
    </v-card-text>
    <v-card-actions>
      <v-btn
        v-if="!replyVisible && user"
        color="success"
        flat
        @click="replyVisible = true"
      >
        reply
      </v-btn>
      <v-text-field
        v-if="replyVisible"
        v-model="replyText"
        autofocus
        label="Reply..."
        @keyup.native.enter="submitReply"
      /><v-btn
        v-if="replyVisible"
        icon
        @click="submitReply"
      >
        <v-icon color="success">
          send
        </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import fb from '~/plugins/firebase'

export default {
    props: {
        answer: {
            type: Object,
            default: null
        },
        user: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            replyVisible: false,
            replyText: '',
            replies: [],
            userVote: {},
            temporaryVoteSum: null
        }
    },
    async beforeMount() {
        this.fetchReplies()
        this.fetchUserVote()
    },
    methods: {
        deleteTrackReply() {
            this.$store
                .dispatch('tracks/deleteTrackReply', this.answer.id)
                .then(() => {
                    this.$store.dispatch(
                        'tracks/getTrackData',
                        this.answer.questionID
                    )
                })
        },
        async castVote(isUpvote) {
            const vote = {
                answerID: this.answer.id,
                userID: this.user.id,
                isUpvote: isUpvote,
                createdAt: fb.serverTimestamp()
            }
            const params = {
                vote: vote,
                questionID: this.answer.questionID
            }
            this.userVote = {
                isUpvote: isUpvote
            }
            await this.$store.dispatch('tracks/castVote', params)
        },
        async submitReply() {
            if (!this.user) return
            const reply = {
                answerID: this.answer.id,
                user: {
                    id: this.user.id,
                    displayName: this.user.displayName,
                    photoURL: this.user.photoURL
                },
                text: this.replyText,
                createdAt: fb.serverTimestamp()
            }
            await this.$store.dispatch('tracks/submitReply', reply)
            this.replyText = ''
            this.fetchReplies()
            this.replyVisible = false
        },
        async deleteReply(reply) {
            await this.$store.dispatch('tracks/deleteReply', { id: reply.id })
            this.fetchReplies()
        },
        async fetchUserVote() {
            if (!this.user) {
                this.userVote = null
                return
            }
            this.userVote = await this.$store.dispatch(
                'tracks/fetchUserAnswerVote',
                { answerID: this.answer.id, userID: this.user.id }
            )
        },
        async fetchReplies() {
            this.replies = await this.$store.dispatch('tracks/fetchReplies', {
                answerID: this.answer.id
            })
        }
    }
}
</script>

<style scoped lang="stylus">
.answer--text
	&:first-line
		line-height 0
	white-space pre-line
	word-break break-word
.vote-widget
	.vote-widget__count
		text-align center
</style>
