<template>
  <v-card v-if="visible" color flat class="mb-2">
    <v-card-text>
      <v-form>
        <v-layout column>
          <v-text-field
            placeholder="Finish the beat from last night"
            @keyup.native.enter="createTask"
            v-model="newTaskText"
          />
          <v-checkbox class="d-inline-block" v-model="isDone" label="mark task as done?"/>
        </v-layout>
      </v-form>
    </v-card-text>
    <v-card-actions v-if="visible">
      <v-spacer/>
      <v-btn @click="visible = false" color="grey" flat>cancel</v-btn>
      <v-btn :loading="loading" @click="post" color="primary" flat>post</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import fb from '~/plugins/firebase'

export default {
  computed: {
    user() {
      return this.$store.getters['auth/user']
    }
  },
  data() {
    return {
      visible: false,
      newTaskText: '',
      isDone: false
    }
  },
  methods: {
    show() {
      this.visible = true
    },
    hide() {
      this.visible = false
    },
    post() {
      const task = {
        text: this.newTaskText,
        user: {
          id: this.user.id,
          displayName: this.user.displayName,
          photoURL: this.user.photoURL
        },
        createdAt: fb.serverTimestamp(),
        isDone: this.isDone
      }
      this.$store.dispatch('tasks/createTask', task)
      this.newTaskText = ''
      this.visible = false
    }
  }
}
</script>

<style scoped lang="stylus">
.ask-card--cta {
  cursor: pointer;
}
</style>
