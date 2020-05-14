<template lang="pug">
section.cover
  article.cover__block.cover__preamble
    slot(name="prembleTitle")
    slot(name="prembleText")
  div.cover__block.cover__space
  article.cover__block.cover__gate
    slot(name="gate")
</template>

<script>
export default {
  name: 'Cover',
}
</script>

<style lang="scss" scoped>
.cover {
  position: relative;
  width: 100%;
  height: 300vh;
  .cover__block {
    width: 100%;
    height: 100vh;
  }
  .cover__preamble {
    background-color: lightyellow;
  }
  .cover__space {
    background-color: lightblue;
  }
  .cover__gate {
    background-color: lightgreen;
  }
}
</style>