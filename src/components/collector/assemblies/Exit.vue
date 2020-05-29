<template lang="pug">
  footer.exit-container(
    :class="{'exit-container--active': $store.state.isEnterCollector || $store.state.isFocusOneCard}"
  )
    p.small 無效預算？揭露108課綱五大亂象
    button.exit-button(
      @click="handleExit"
      aria-label="enter project"
      name="enter project"
    )
      NmdButton(
        textColor="#93acff"
        bgColor="#93acff"
        theme="outlined"
        border="m"
        size="s"
      ) 進專題
</template>

<script>
import { sendGaMethods } from '@/mixins/masterBuilder.js';
import NmdButton from '@/components/_common/pinhead/NmdButton.vue';

export default {
  name: 'Exit',
  mixins: [sendGaMethods],
  components: {
    NmdButton
  },
  methods: {
    handleExit() {
      if(!this.$store.state.isEnterMainContent) this.$store.dispatch('updatedIsEnterMainContent', true);
      if(this.$store.state.isEnterCollector) this.$store.dispatch('updatedIsEnterCollector', false);

      if(this.$store.state.isFocusOneCard) {
        this.sendGA({
          category: 'enter',
          action: 'click',
          label: `卡片內頁:${this.$store.state.cardActiveIndex}`
        });
        this.$store.dispatch('updatedIsFocusOneCard', false);
      } else {
        this.sendGA({
          category: 'enter',
          action: 'click',
          label: '卡片封面'
        });
      }

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
.exit-button {
  width: 100px;
  margin-left: 8px;
  @include clean-btn;
}
</style>