<template lang="pug">
  figure.card(:id="'card-' + pos" :class="{'card--active': false}" :style="{transform}" @click="handleCardClick()")
    img(:src="imgSrc")
    //- p {{expection}}
    //- p {{truth}}
</template>

<script>
import { autoResize_2 } from '@/mixins/masterBuilder.js';

const CARDS_ROW = {
  mob: 6,
  pc: 4
};
const CARD_SIZE = {
  // mob: 0.24,
  // pc: 0.32,
  mob: 0.24,
  pc: 0.16
}
const CARD_GAP = {
  mob: 0.05,
  // pc: 0.1
  pc: 0.05
}

export default {
  name: 'Card',
  mixins: [autoResize_2],
  props: {
    index: {
      type: Number,
      required: true
    },
    pos: {
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
    },
  },
  computed: {
    DEVICE() {
      return this.isMob ? 'mob' : 'pc';
    },
    imgSrc() {
      return require(`~/img/illus/card/${this.index}.jpg`);
    },
    transform() {
      const translate = `translate(${this.translate.x}px,${this.translate.y}px)`
      return translate;
    },
    translate() {
      const MAX_ROW = CARDS_ROW[this.DEVICE] || 6;
      const MAX_COL = Math.ceil(this.$parent.CARD_AMOUNT.need / MAX_ROW) || 3;
      const loopRow = this.$store.state.cardCollector.loopRow;
      const loopCol = this.$store.state.cardCollector.loopCol;
      const row = (this.pos - 1 + loopRow) % MAX_ROW;
      const col = (Math.floor((this.pos - 1) / MAX_ROW) + loopCol) % MAX_COL;

      function translateYOffset(col) {
        if (col % 2 === 1) return 0.5;
        else return 0;
      }
      const translateXOffset = 0.3;
      const CARD_WIDTH = window.innerHeight * CARD_SIZE[this.DEVICE] * 0.75;
      const CARD_HEIGHT = window.innerHeight * CARD_SIZE[this.DEVICE];
      const GAP = window.innerHeight * CARD_GAP[this.DEVICE];

      const initialX = (col - translateXOffset) * (CARD_WIDTH + GAP);
      const initialY = (row - translateYOffset(col)) * (CARD_HEIGHT + GAP);

      return {
        x: initialX,
        y: initialY
      };
    },
  },
  methods: {
    handleCardClick() {
      this.$store.dispatch('updatedCardCurrendIndex', this.index);
      this.$store.dispatch('updatedCardEnterMode', true);
    },
  },
}
</script>

<style lang="scss" scoped>
.card {
  position: absolute;
  left: 0;
  top: 0;
  overflow: hidden;
  width: 18vh;
  height: 24vh;
  margin: 0;
  transition: .333s ease-in-out;
  cursor: pointer;

  @include pc {
    // width: 24vh;
    // height: 32vh;
    width: 12vh;
    height: 16vh;
  }

  &.card--active {}

  img {
    height: 100%;
    object-fit: cover;
  }
}
</style>