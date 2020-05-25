<template lang="pug">
  figure.card(
    :id="'card-' + pos"
    :class="{'card--active': false, 'card--show': shouldCardShow}"
    :style="{transform, top: `${position.top}px`, left: `${position.left}px`}"
    @click="handleCardClick()"
  )
    div.card-cover
      img(
        :id="'card-cover-' + pos"
        :src="imgSrc"
      )
      //- p {{expection}}
      //- p {{truth}}
</template>

<script>
import { autoResize_2 } from '@/mixins/masterBuilder.js';
// import _debounce from 'lodash.debounce';

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
    translate: {
      type: Object,
    },
    cardNeed: {
      type: Number,
      default: 0
    },
    cardSize: {
      type: Number,
      default: 0
    },
    cardsRow: {
      type: Number,
      default: 0
    },
  },
  data() {
    return {
      shouldCardShow: true,
      dragTranslate: null,
      dataAccumulatedDragTranslate: {
        x: 0,
        y: 0
      },
      loop: {
        row: 0,
        col: 0
      },
    }
  },
  computed: {
    imgSrc() {
      return require(`~/img/illus/card/${this.index}.jpg`);
    },
    transform() {
      return `translate(${this.dataAccumulatedDragTranslate.x}px,${this.dataAccumulatedDragTranslate.y}px)`;
    },
    position() {
      const MAX_ROW = this.cardsRow;
      const MAX_COL = Math.ceil(this.cardNeed / MAX_ROW);
      const row = (this.pos - 1) % MAX_ROW;
      const col = (Math.floor((this.pos - 1) / MAX_ROW)) % MAX_COL;

      function translateYOffset(col) {
        if (col % 2 === 1) return 0.5;
        else return 0;
      }
      const translateXOffset = 0.3;
      const CARD_WIDTH = window.innerHeight * this.cardSize * 0.75;
      const CARD_HEIGHT = window.innerHeight * this.cardSize;

      const initialTop = (row - translateYOffset(col) + this.loop.row) * CARD_HEIGHT;
      const initialLeft = (col - translateXOffset + this.loop.col) * CARD_WIDTH;

      return {
        top: initialTop,
        left: initialLeft,
      }
    },
  },
  watch: {
    translate: {
      handler(value) {
        const dragTranslateX = value ? value.x : 0;
        const dragTranslateY = value ? value.y : 0;
        this.dataAccumulatedDragTranslate.x += dragTranslateX * 1.25;
        this.dataAccumulatedDragTranslate.y += dragTranslateY * 1.25;

        this.handleSpecCardLoop();
      },
      deep: true
    }
  },
  methods: {
    handleCardClick() {
      this.$store.dispatch('updatedCardCurrendIndex', this.index);
      this.$store.dispatch('updatedCardEnterMode', true);
    },
    handleSpecCardLoop() {
      setTimeout(() => {
        const bounds = this.$el.getBoundingClientRect();
        const padding = window.innerHeight * 0.025;
        const extension = 1.5;
        const ch = (window.innerHeight * this.cardSize - padding) * extension;
        const cw = (window.innerHeight * this.cardSize * 0.75 - padding) * extension;
        const MAX_ROW = this.cardsRow;

        const topCondition = bounds.top < -ch;
        const bottomCondition = bounds.bottom > window.innerHeight + ch;
        const leftCondition = bounds.left < -cw;
        const rightCondition = bounds.right > window.innerWidth + cw;

        if (topCondition) this.loop.row += MAX_ROW;
        if (bottomCondition) this.loop.row -= MAX_ROW;
        if (leftCondition) this.loop.col += Math.ceil(this.cardNeed / MAX_ROW);
        if (rightCondition) this.loop.col -= Math.ceil(this.cardNeed / MAX_ROW);

        if (topCondition || bottomCondition || leftCondition || rightCondition) {
          this.shouldCardShow = false;
          setTimeout(() => {
            this.shouldCardShow = true;
          }, 5);
        }
      }, 700);
    },
  },
}
</script>

<style lang="scss" scoped>
.card {
  position: absolute;
  left: 0;
  top: 0;
  // overflow: hidden;
  width: 21vh;
  height: 28vh;
  margin: 0;
  padding: 2.5vh;
  opacity: 0;
  transition: transform .750s;
  cursor: pointer;
  @include clean-tap;
  @include pc {
    width: 24vh;
    height: 32vh;
  }

  &.card--show {
    animation: fade-in .333s ease-in-out forwards;
    @keyframes fade-in {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }
  &.card--active {

  }
  .card-cover {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      object-position: center;
    }
  }
}
</style>