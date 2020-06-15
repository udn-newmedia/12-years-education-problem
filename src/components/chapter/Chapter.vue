<template lang="pug">
section.chapter(:id="'chapter-' + id")
  slot
</template>

<script>
export default {
  name: 'Chapter',
  props: {
    id: {
      type: Number,
    }
  }
}
</script>

<style lang="scss" scoped>
.chapter {
  position: relative;
  width: 100%;
  h2 {
    font-family: source-han-seri-tc;
    font-weight: bold;
  }
}
</style>