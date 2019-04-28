<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <div
        class="property"
        v-on="on"
      >
        <span class="property__key">{{ keyText }}</span>
        <span class="property__value">{{ value }}</span>
      </div>
    </template>
    <span>{{ tooltipText }}</span>
  </v-tooltip>
</template>

<script>
export default {
    props: {
        keyText: {
            type: String,
            default: ''
        },
        value: {
            type: String,
            default: ''
        },
        tooltipText: {
            type: String,
            default: ''
        }
    }
}
</script>

<style lang="stylus" scoped>
    .property
        color white
        display inline-block
        margin-left 30px
    .property__key
        font-weight 100
        margin-right 10px
        font-size 13px
</style>
