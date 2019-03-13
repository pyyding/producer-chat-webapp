<template>
  <v-layout
    column
    align-center
  />
</template>

<script>
export default {
    head() {
        link: [
            {
                rel: 'stylesheet',
                href: 'https://fonts.googleapis.com/css?family=Roboto'
            }
        ]
    },
    mounted() {
        window.location = 'https://www.producer.chat/welcome'
    }
}
</script>
