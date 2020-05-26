<template lang="pug">
  button.entrance(:class="{'entrance--disabled': !$store.state.isEnterMainContent}" @click="handleEntrance")
</template>

<script>
import { sendGaMethods } from '@/mixins/masterBuilder.js';

export default {
  name: 'Entrance',
  mixins: [sendGaMethods],
  methods: {
    handleEntrance() {
      if(this.$store.state.isEnterMainContent) this.$store.dispatch('updatedIsEnterMainContent', false);
      if(!this.$store.state.isEnterCollector) this.$store.dispatch('updatedIsEnterCollector', true);

      setTimeout(() => {
        window.scroll(0, window.innerHeight * 2);
      }, 10);
    }
  },
}
</script>

<style lang="scss" scoped>
.entrance {
  position: relative;
  width: 36vw;
  padding-bottom: 160%;
  color: #93acff;
  text-align: center;
  background-color: transparent;
  cursor: pointer;
  @include clean-btn;
  @include pad {
    width: 28vw;
  }
  @include pc {
    width: 17.5vw;
  }

  &.entrance--disabled {
    pointer-events: none;
  }
}
</style>