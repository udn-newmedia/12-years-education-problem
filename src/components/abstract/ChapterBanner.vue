<template lang="pug">
article.chapter-banner
  slot
</template>

<script>
export default {
  name: 'ChapterBanner',
}
</script>

<style lang="scss" scoped>
.chapter-banner {
  position: relative;
  width: 100%;
  min-height: 100vh;
  border: solid 1px red;
}
</style>