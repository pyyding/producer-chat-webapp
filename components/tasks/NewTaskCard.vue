<template>
  <v-card
    v-if="visible"
    color
    flat
    class="mb-2">
    <v-card-text>
      <v-form>
        <v-layout column>
          <v-text-field
            v-model="newTaskText"
            placeholder="Finish the beat from last night"
            @keyup.native.enter="createTask"
          />
          <v-checkbox
            v-model="isDone"
            class="d-inline-block"
            label="mark task as done?"/>
        </v-layout>
      </v-form>
    </v-card-text>
    <v-card-actions v-if="visible">
      <v-spacer/>
      <v-btn
        color="grey"
        flat
        @click="visible = false">cancel</v-btn>
      <v-btn
        :loading="loading"
        color="primary"
        flat
        @click="post">post</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import fb from '~/plugins/firebase'

export default {
    data() {
        return {
            visible: false,
            newTaskText: '',
            isDone: false
        }
    },
    computed: {
        user() {
            return this.$store.getters['auth/user']
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
            if (this.isDone) {
                task.doneAt = fb.serverTimestamp()
            }
            this.$store.dispatch('tasks/createTask', task)
            this.newTaskText = ''
            this.visible = false
        }
    }
}
</script>

<style scoped lang="stylus">
.track-form--cta {
  cursor: pointer;
}
</style>
