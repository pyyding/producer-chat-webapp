<template>
  <v-card
    color
    flat
  >
    <v-card-title class="align-center pb-0 pl-4">
      <nuxt-link :to="`/${post.user.slug || post.user.id}`">
        <v-avatar
          class="mr-2"
          size="36px"
        >
          <img
            :src="post.user.photoURL"
            alt="avatar"
          >
        </v-avatar>
      </nuxt-link>
      <div class="d-inline-block ml-1">
        <nuxt-link :to="`/${post.user.slug || post.user.id}`">
          <strong>{{ post.user.displayName }}</strong>
        </nuxt-link>
        <div class="caption grey--text">
          {{ post.dateString }}
        </div>
      </div>
    </v-card-title>

    <v-card-text>
      <task-list
        :tasks="post.data"
        disabled
        hide-input
      />
    </v-card-text>
  </v-card>
</template>

<script>
import TaskList from '~/components/tasks/TaskList.vue'
export default {
    components: { TaskList },
    props: {
        post: {
            type: Object,
            default: null
        }
    },
    computed: {
        user() {
            return this.$store.getters['auth/user']
        }
    }
}
</script>

<style lang="stylus" scoped></style>
