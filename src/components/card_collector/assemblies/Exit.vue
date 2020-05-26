<template lang="pug">
  footer.exit-container(:class="{'exit-container--active': $store.state.isEnterCollector}")
    p.small 無效預算？揭露108課綱五大亂象
    button(@click="handleExit") Exit
</template>

<script>
import { sendGaMethods } from '@/mixins/masterBuilder.js';

export default {
  name: 'Exit',
  mixins: [sendGaMethods],
  methods: {
    handleExit() {
      if(!this.$store.state.isEnterMainContent) this.$store.dispatch('updatedIsEnterMainContent', true);
      if(this.$store.state.isEnterCollector) this.$store.dispatch('updatedIsEnterCollector', false);
      if(this.$store.state.isFocusOneCard) this.$store.dispatch('updatedIsFocusOneCard', false);
      window.scroll(0, 0);
    },
  },
}
</script>

<style lang="scss" scoped>
.exit-container {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 72px;
  color: #93acff;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #031128;
  opacity: 0.9;
  transform: translateY(100%);
  transition: .750s;
}
.exit-container--active {
  transform: translateY(0);
}
</style>