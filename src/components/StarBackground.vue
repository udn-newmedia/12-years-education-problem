<template lang="pug">
  div.star-bg(:class="{ 'star-bg--hide': $store.state.isEnterMainContent}")
    div#bg-stars
    div#bg-stars-2
    div#bg-stars-3
</template>

<script>
export default {
 name: 'StarBackground'
}
</script>

<style lang="sass" scoped>
@import '~/style/stars.sass'
.star-bg
  position: relative
  pointer-events: none
  height: 0
  transition: .333s

  &.star-bg--hide
    opacity: 0
</style>