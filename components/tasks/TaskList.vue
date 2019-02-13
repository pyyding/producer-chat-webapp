<template>
  <v-list>
    <v-list-tile
      v-for="task in tasks"
      :key="task.id"
      class="task-item"
      subheader>
      <v-list-tile-action>
        <v-checkbox
          :disabled="disabled"
          :input-value="task.isDone"
          @change="toggleTaskStatus(task)"
        />
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>{{ task.text }}</v-list-tile-title>
      </v-list-tile-content>
      <v-spacer/>
      <v-list-tile-action v-if="user && task.user.id === user.id">
        <v-btn
          class="task-item__delete-button"
          icon
          @click="deleteTask(task)">
          <v-icon
            small
            class="grey--text">clear</v-icon>
        </v-btn>
      </v-list-tile-action>
    </v-list-tile>
    <v-list-tile v-if="!hideInput">
      <v-text-field
        v-model="newTaskText"
        placeholder="Finish the beat from last night"
        @keyup.native.enter="createTask"
      />
      <v-btn
        icon
        @click="createTask">
        <v-icon color="secondary">create</v-icon>
      </v-btn>
    </v-list-tile>
  </v-list>
</template>

<script>
import fb from '~/plugins/firebase'

export default {
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        tasks: {
            type: Array,
            default: new Array()
        },
        hideInput: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            newTaskText: ''
        }
    },
    computed: {
        user() {
            return this.$store.getters['auth/user']
        }
    },
    methods: {
        toggleTaskStatus(task) {
            const params = {
                task: task,
                isDone: !task.isDone
            }
            this.$store.dispatch('tasks/setTaskStatus', params)
        },
        createTask() {
            const task = {
                text: this.newTaskText,
                user: {
                    id: this.user.id,
                    displayName: this.user.displayName,
                    photoURL: this.user.photoURL
                },
                createdAt: fb.serverTimestamp(),
                isDone: false
            }
            this.$store.dispatch('tasks/createTask', task)
            this.newTaskText = ''
        },
        deleteTask(task) {
            this.$store.dispatch('tasks/deleteTask', task)
        }
    }
}
</script>

<style lang="stylus">
.v-input--selection-controls .v-input__slot {
  margin-bottom: initial;
}

.task-item:hover {
  .task-item__delete-button {
    opacity: 1;
  }
}

.task-item__delete-button {
  opacity: 0;
}
</style>
