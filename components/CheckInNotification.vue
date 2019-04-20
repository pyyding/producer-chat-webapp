<template>
  <notifications
    group="checkin"
    position="bottom right"
  >
    <template
      slot="body"
      slot-scope="props"
    >
      <div class="container">
        <a
          class="close"
          @click="props.close"
        >
          <v-icon small>close</v-icon>
        </a>
        <div class="image_row">
          <v-img
            max-width="300px"
            :src="gif"
            :lazy-src="require('~/assets/dilla-placeholder.jpg')"
          />
        </div>
        <div class="text_row">
          <a class="title">
            {{ props.item.title }}
          </a>
          <!-- eslint-disable-next-line -->
          <div v-html="props.item.text" />
        </div>
      </div>
    </template>
  </notifications>
</template>

<script>
export default {
    computed: {
        gif() {
            const now = new Date()
            const index = now.getDate() - 1
            const gifs = [
                'https://media.giphy.com/media/VzsXNKTAuFmQU/giphy.gif',
                'https://media.giphy.com/media/eLFKlzc9S3kFq/giphy.gif',
                'https://media.giphy.com/media/l41YgqiZc7EPJT3YQ/giphy.gif',
                'https://media.giphy.com/media/BoHCeLmEKytt7oFxyR/giphy.gif',
                'https://media.giphy.com/media/3oEdvawuSWUFWfWP0k/giphy.gif',
                'https://media.giphy.com/media/12vQiYtQcOwOFG/giphy.gif',
                'https://media.giphy.com/media/1sw6sy85n8vkur6x5T/giphy.gif',
                'https://media.giphy.com/media/FBzqZGthkW6KQ/giphy.gif',
                'https://media.giphy.com/media/3tuO3lKrVBFq8/giphy.gif',
                'https://media.giphy.com/media/8RtwsZCgRzMt2/giphy.gif',
                'https://media.giphy.com/media/VeMjxABqrb0Yw/giphy.gif',
                'https://media.giphy.com/media/6RbxN2cEbtCHS/giphy.gif',
                'https://media.giphy.com/media/xUPGGiWOANhNO8qwdG/giphy.gif',
                'https://media.giphy.com/media/RDbZGZ3O0UmL6/giphy.gif',
                'https://media.giphy.com/media/yJUrIRDpku3ao/giphy.gif',
                'https://media.giphy.com/media/l3vRl0aRzOXr4qHTO/giphy.gif',
                'https://media.giphy.com/media/l3vRl0aRzOXr4qHTO/giphy.gif',
                'https://media.giphy.com/media/8vqF2pImLEW3WOI0Gy/giphy.gif',
                'https://media.giphy.com/media/6oX3Jo9zzpEWc/giphy.gif',
                'https://media.giphy.com/media/6oX3Jo9zzpEWc/giphy.gif',
                'https://media.giphy.com/media/XJ2juwJbDcEkzqx4e2/giphy.gif',
                'https://media.giphy.com/media/5n18Zq66EO9lm/giphy.gif',
                'https://media.giphy.com/media/SYVVMFjiTzV3a/giphy.gif',
                'https://media.giphy.com/media/xThuWcZzGnonnG3ayQ/giphy.gif',
                'https://media.giphy.com/media/SJz6dNDQ4bOiQ/giphy.gif',
                'https://media.giphy.com/media/TEWmBQvs5xds6fAMX4/giphy.gif',
                'https://media.giphy.com/media/TrB29ApJbsFkk/giphy.gif',
                'https://media.giphy.com/media/5yYxI8HMtHkQuZMS30/giphy.gif',
                'https://media.giphy.com/media/3YIqOJCp6tOuCZglRr/giphy.gif',
                'https://media.giphy.com/media/3o6Zt5J8VgRbpgizkc/giphy.gif',
                'https://media.giphy.com/media/wH492DEqdp3ji/giphy.gif',
                'https://media.giphy.com/media/C6Y3kbeE448jC/giphy.gif'
            ]
            return gifs[index]
        }
    }
}
</script>

<style lang="stylus" scoped>
    .container
        background #d5fbeb
        border-radius 1px
        padding-top 30px
    .text_row
        margin-top 10px
    .title
        font-weight 500
    .close
        position absolute
        right 25px
        top 5px
</style>
