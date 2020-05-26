<template lang="pug">
  div.white-bg(v-if="$store.state.isEnterMainContent")
</template>

<script>
export default {
 name: 'WhiteBackground'
}
</script>

<style lang="scss" scoped>
.white-bg {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background-color: #ffffff;
  animation: fade-in 2s forwards;
}
  
</style>