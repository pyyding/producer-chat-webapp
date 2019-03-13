<template>
  <v-container>
    <v-layout row>
      <h2>
        <v-btn
          disabled
          icon
        >
          <v-icon>check_circle</v-icon>
        </v-btn>Tasks
      </h2>
    </v-layout>
    <v-layout
      row
      class="mt-2"
    >
      <v-flex xs12>
        <task-list :tasks="dueTasks" />
      </v-flex>
    </v-layout>
    <v-layout
      row
      class="mt-4"
    >
      <h2>
        <v-btn
          icon
          @click="showDoneTasks = !showDoneTasks"
        >
          <v-icon>
            {{ showDoneTasks ? 'expand_less' : 'expand_more' }}
          </v-icon>
        </v-btn>Done
      </h2>
    </v-layout>
    <v-layout
      row
      class="mt-2"
    >
      <v-scroll-y-transition>
        <v-flex
          v-show="showDoneTasks"
          xs12
        >
          <task-list
            :tasks="doneTasks"
            hide-input
          />
        </v-flex>
      </v-scroll-y-transition>
    </v-layout>
  </v-container>
</template>

<script>
import TaskList from '~/components/tasks/TaskList.vue'
export default {
    components: { TaskList },
    data() {
        return {
            showDoneTasks: false
        }
    },
    computed: {
        dueTasks() {
            return this.$store.getters['tasks/dueTasks']
        },
        doneTasks() {
            return this.$store.getters['tasks/doneTasks']
        }
    },
    async beforeCreate() {
        const slug = this.$route.params.slug
        const producer = await this.$store.dispatch(
            'producer/fetchProducer',
            slug
        )
        this.$store.dispatch('tasks/fetchTasks', producer.id)
    },
    methods: {}
}
</script>
