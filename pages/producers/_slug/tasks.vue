<template>
    <v-container>
        <v-layout row>
            <h2>Tasks</h2>
        </v-layout>
        <v-layout row class="mt-2">
            <v-flex xs12>
                <task-list :tasks="tasks"/>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import TaskList from '~/components/tasks/TaskList.vue'
export default {
    components: { TaskList },
    data () {
        return {
        }
    },
    methods: {
    },
    computed: {
        tasks () {
            return this.$store.getters['tasks/tasks']
        }
        // for blog
        // clonedItems () {
        //     const clonedItems = []
        //     this.items.forEach((item) => {
        //         clonedTasks.push({...item})
        //     })
        //     return clonedItems
        // }
    },
    async beforeCreate () {
        const slug = this.$route.params.slug
        const producer = await this.$store.dispatch('producer/fetchProducer', slug)
        this.$store.dispatch('tasks/fetchTasks', producer.id)
    }
}
</script>
