<template lang="pug">
  div.cover-collector-container__bg
    div#bg-stars
    div#bg-stars-2
    div#bg-stars-3
</template>

<script>
export default {
 name: 'Background'
}
</script>

<style lang="sass">
@import '~/style/stars.sass'
.cover-collector-container__bg
  position: relative
  pointer-events: none
  height: 0
</style>