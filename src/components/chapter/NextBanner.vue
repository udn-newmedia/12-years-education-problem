<template lang="pug">
article.next-banner
  slot
</template>

<script>
export default {
  name: 'NextBanner',
  props: {
    cost: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    next: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.next-banner {
  position: relative;
  width: 100%;
  min-height: 100vh;
  border: solid 1px red;
}
</style>