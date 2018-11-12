<template>
    <v-list>
        <v-list-tile class="task-item" v-for="task in tasks" :key="task.id" subheader>
            <v-list-tile-action>
                <v-checkbox :disabled="disabled" :input-value="task.isDone" @change="toggleTaskStatus(task)"/>
            </v-list-tile-action>
            <v-list-tile-content>
                <v-list-tile-title>
                    {{task.text}}
                </v-list-tile-title>
            </v-list-tile-content>
            <v-spacer/>
            <v-list-tile-action v-if="user && task.user.id === user.id">
                <v-btn class="task-item__delete-button" @click="deleteTask(task)" icon><v-icon small class="grey--text">clear</v-icon></v-btn>
            </v-list-tile-action>
        </v-list-tile>
        <v-list-tile v-if="!hideInput">
            <v-text-field 
                placeholder="Finish the beat from last night" 
                @keyup.native.enter="createTask" 
                v-model="newTaskText"
            />
            <v-btn @click="createTask" icon><v-icon color="secondary">create</v-icon></v-btn>
        </v-list-tile>
    </v-list>
</template>

<script>
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
        createdAt: new Date(),
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
