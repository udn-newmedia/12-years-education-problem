<template lang="pug">
section.budget(:class="{ 'budget--await': !isEnter }")
  div.budget-line
  slot
</template>

<script>
export default {
  name: 'Budget',
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
.budget {
  position: relative;
  transition: 1s;
  &.budget--await {
    transform: translateY(35%);
  }



  .budget-line {
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