<template lang="pug">
section.abstract
  slot
</template>

<script>
export default {
  name: 'Abstract',
}
</script>

<style lang="scss" scoped>
.abstract {
  position: relative;
  width: 100%;
  min-height: 100vh;
  border: solid 1px red;
}
</style>