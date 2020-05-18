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
  padding: 32vh 0;
  color: #f2e6e6;
  background-color: #080808;

  @include pc {
    padding: 16vh 0;
  }
}
</style>