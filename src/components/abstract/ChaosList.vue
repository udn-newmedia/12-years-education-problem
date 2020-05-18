<template lang="pug">
section.chaos-list
  slot
</template>

<script>
export default {
  name: 'ChaosList',
}
</script>

<style lang="scss" scoped>
.chaos-list {
  p {
    margin: 0;
  }
  .td--red {
    padding-right: 0.5rem;
    color: #e25151;
  }
}
</style>