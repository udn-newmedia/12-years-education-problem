<template lang="pug">
figure.card-bg(
  :class="cardBgClassAttr"
  :style="{ backgroundImage: bgSrc }"
)
</template>

<script>
import { autoResize_2 } from '@/mixins/masterBuilder.js';

export default {
  name: 'CardBg',
  mixins: [autoResize_2],
  props: {
    index: {
      type: Number,
      default: null,
    }
  },
  computed: {
    cardBgClassAttr() {
      return {
        'card-bg--active':  this.$store.state.isFocusOneCard && this.$store.state.cardActiveIndex === this.index,
        'card-bg--active-first-time': this.$store.state.isFocusOneCard
      }
    },
    bgSrc() {
      if (!this.index) return;
      const url = require(`~/img/illus/bg/${this.index}/${this.isMob ? 'mob' : 'pc'}.jpg`);
      return `url(${url})`;
    }
  },
}
</script>

<style lang="scss" scoped>
.card-bg {
  will-change: transform;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  padding: 0;
  margin: 0;
  opacity: 0;
  transform: translateY(100%);
  transition: 1s ease-in-out;
  &.card-bg--active {
    opacity: 1;
    transform: translateY(0);
  }
  &.card-bg--active-first-time {
    transform: translateY(0) rotateX(-180deg);
  }
}
</style>