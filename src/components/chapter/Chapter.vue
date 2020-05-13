<template lang="pug">
section.chapter
  slot
</template>

<script>
export default {
  name: 'Chapter',
}
</script>

<style lang="scss" scoped>
.chapter {
  position: relative;
  width: 100%;
  min-height: 100vh;
  border: solid 1px red;
}
</style>