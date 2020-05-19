<template lang="pug">
  figure.card(:class="{'card--active': true}" :style="{backgroundImage}")
    img(:src="imgSrc")
    p {{expection}}
    p {{truth}}
</template>

<script>
import { autoResize_2 } from '@/mixins/masterBuilder.js';

export default {
  name: 'Card',
  mixins: [autoResize_2],
  props: {
    index: {
      type: Number,
      required: true
    },
    expection: {
      type: String,
      required: true
    },
    truth: {
      type: String,
      required: true
    }
  },
  computed: {
    backgroundImage() {
      const url = require(`~/img/illus/bg/${this.index}/${this.isMob ? 'mob' : 'pc'}.jpg`);
      return `url(${url})`;
    },
    imgSrc() {
      return require(`~/img/illus/card/${this.index}.jpg`);
    }
  },
}
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  overflow: hidden;
  width: 60px;
  height: 80px;
  float: left;

  img {
    width: 50%;
  }
}
</style>