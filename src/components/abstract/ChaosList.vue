<template lang="pug">
section.chaos-list(:class="{ 'chaos-list--await': !isEnter }")
  div.chaos-list-line
  slot
</template>

<script>
export default {
  name: 'ChaosList',
  data() {
    return {
      isEnter: false
    }
  },
  mounted() {
    const vm = this;
    function onEnterChapterBanner() {
      if (!vm.$store.state.isEnterMainContent) return;
      if (vm.isEnter) return;
      vm.isEnter = true;
    }

    const watcher = new IntersectionObserver(onEnterChapterBanner);
    watcher.observe(this.$el);
  },
}
</script>

<style lang="scss" scoped>
$red: #a72626;
.chaos-list {
  position: relative;
  margin-top: 64px;
  transition: 1s;
  &.chaos-list--await {
    transform: translateY(35%);
  }



  p {
    margin: 0;
  }
  .td--red {
    padding-right: 0.5rem;
    color: #e25151;
  }

  .chaos-list-line {
    position: absolute;
    top: 1rem;
    left: -16px;
    height: 1px;
    width: 160px;
    background-color: $red;
    transform: translateX(-100%);
  }
}
</style>