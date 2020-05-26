<template lang="pug">
  figure.card(
    :id="'card-' + pos"
    :class="cardClassAttr"
    :style="{transform, left: `${position.left}px`, top: `${position.top}px`}"
  )
    div.card__cover(v-show="!isCardActive" @click="handleCardClick()")
      img(
        :id="'card__cover-' + pos"
        :src="imgSrc"
        draggable=false
      )
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
    pos: {
      type: Number,
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
    isOnDragging: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      shouldCardShow: true,
      isCardActive: false,
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
    cardClassAttr() {
      return {
        'card--active': this.isCardActive,
        'card--show': this.shouldCardShow,
        'card--ondragging': this.isOnDragging,
        'card--no-transition': !this.isCardActive && this.$store.state.isFocusOneCard
      };
    },
    isFocusOneCard() {
      return this.$store.state.isFocusOneCard;
    },
    isEnterMainContent() {
      return this.$store.state.isEnterMainContent;
    },
    imgSrc() {
      return require(`~/img/illus/card/${this.index}.jpg`);
    },
    transform() {
      if (this.isCardActive) {
        // TODO: 移動到中間
        return 'translate(-50%,-50%)';
      } else {
        return `translate(${this.dataAccumulatedDragTranslate.x}px,${this.dataAccumulatedDragTranslate.y}px)`;
      }
    },
    position() {
      function translateYOffset(col) {
        if (col % 2 === 1) return 0.5;
        else return 0;
      }

      const MAX_ROW = this.cardsRow;
      const MAX_COL = Math.ceil(this.cardNeed / MAX_ROW);
      const row = (this.pos - 1) % MAX_ROW;
      const col = (Math.floor((this.pos - 1) / MAX_ROW)) % MAX_COL;


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
        this.dataAccumulatedDragTranslate.x += dragTranslateX * 0.5;
        this.dataAccumulatedDragTranslate.y += dragTranslateY * 0.5;

        // Observable
        this.handleSpecCardLoop();
      },
      deep: true
    },
    isFocusOneCard: {
      handler(value) {
        if (!value) this.isCardActive = false;
      }
    },
    isEnterMainContent: {
      handler() {
        // if (value)
        // TODO: 卡片集中到中間
      }
    }
  },
  methods: {
    handleCardClick() {
      this.isCardActive = !this.isCardActive;
      this.$store.dispatch('updatedIsFocusOneCard', true);
      this.$store.dispatch('updatedCardActiveIndex', this.index);
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

<style lang="scss">
.card {
  position: absolute;
  left: 0;
  top: 0;
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
  }
  &.card--ondragging {
    pointer-events: none;
  }
  &.card--active {
    opacity: 1 !important;
    width: 90vw;
    height: 320px;
    transition: .750s;
    @include pc {
      width: 640px;
      height: 320px;
    }
  }
  &.card--no-transition {
    pointer-events: none;
    transition: 0s !important;
    animation: fade-out .333s ease-in-out forwards;
  }
  .card__cover {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      object-position: center;
      user-select: none;
      user-drag: none; 
      -moz-user-select: none;
      -webkit-user-drag: none;
      -webkit-user-select: none;
      -ms-user-select: none;
    }
  }
}
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes fade-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>