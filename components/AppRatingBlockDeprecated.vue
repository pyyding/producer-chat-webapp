<template>
  <div>
    <v-icon
      :color="color"
      :small="small" >{{ firstStar }}</v-icon>
    <v-icon :small="small">{{ secondStar }}</v-icon>
    <v-icon :small="small">{{ thirdStar }}</v-icon>
    <v-icon :small="small">{{ forthStar }}</v-icon>
    <v-icon :small="small">{{ fifthStar }}</v-icon>
  </div>
</template>

<script>
export default {
    data() {
        return {
            rating: 2.1,
            small: true,
            color: ''
        }
    },
    computed: {
        firstStar() {
            return this.rating === 0
                ? 'star_border'
                : this.rating >= 1
                    ? 'star'
                    : 'star_half'
        },
        secondStar() {
            return this.rating < 1
                ? 'star_border'
                : this.rating >= 2
                    ? 'star'
                    : 'star_half'
        },
        thirdStar() {
            return this.rating < 2
                ? 'star_border'
                : this.rating >= 3
                    ? 'star'
                    : 'star_half'
        },
        forthStar() {
            return this.rating < 3
                ? 'star_border'
                : this.rating >= 4
                    ? 'star'
                    : 'star_half'
        },
        fifthStar() {
            return this.rating < 4
                ? 'star_border'
                : this.rating === 5
                    ? 'star'
                    : 'star_half'
        }
    }
}
</script>

<style scoped lang="stylus">

</style>
