<template>
  <v-card flat>
    <v-card-text>
      <v-progress-circular
        v-if="loading"
        class="loadingSpinner"
        indeterminate
        color="primary"
      />
      <calendar-heatmap
        v-if="!loading"
        :values="groupedTasks"
        :end-date="new Date()"
        :range-color="['#ebedf0', '#26EEC3', '#20be99', '#1FAA86', '#1D8A68']"
        tooltip-unit="check-ins"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import _ from 'lodash'
import { CalendarHeatmap } from 'vue-calendar-heatmap'

export default {
    components: { CalendarHeatmap },
    computed: {
        groupedTasks() {
            const tasks = this.$store.getters['tasks/tasks']
            if (tasks.length > 0) {
                const groupedTasks = _.reduce(
                    tasks,
                    (res, task) => {
                        if (!task.doneAt) return res
                        const date = task.doneAt.toDate().toDateString()
                        if (
                            res.length > 0 &&
                            res[res.length - 1].date === date
                        ) {
                            const element = res[res.length - 1]
                            element.count += 1
                            element.text =
                                element.text === ''
                                    ? task.text
                                    : `${element.text}\n${task.text}`
                            res[res.length - 1] = element
                            return res
                        }
                        res.push({
                            date,
                            count: 1,
                            text: task.text
                        })
                        return res
                    },
                    []
                )
                return groupedTasks
            }
            return []
        },
        loading() {
            return this.$store.getters['tasks/loading']
        }
    }
}
</script>
