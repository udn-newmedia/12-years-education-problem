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
  h3 {
    font-family: source-han-seri-tc;
    font-weight: bold;
  }
}
</style>