<template>
  <svg
    :width="width"
    :height="height"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
  >
    <title :id="iconName">
      {{ iconName }}
    </title>
    <g :fill="iconColor">
      <slot />
    </g>
  </svg>
</template>

<script>
export default {
    props: {
        iconName: {
            type: String,
            default: 'box'
        },
        width: {
            type: [Number, String],
            default: 32
        },
        height: {
            type: [Number, String],
            default: 32
        },
        iconColor: {
            type: String,
            default: 'black'
        }
    }
}
</script>
