<template lang="pug">
  figure.card(:id="'card-' + pos" :class="{'card--active': false}" :style="{transform, top: `${position.top}px`, left: `${position.left}px`}" @click="handleCardClick()")
    div.card-cover
      img(:src="imgSrc")
      //- p {{expection}}
      //- p {{truth}}
</template>

<script>
import { autoResize_2 } from '@/mixins/masterBuilder.js';
import _debounce from 'lodash.debounce';
import { Draggable } from '@shopify/draggable';

const CARDS_ROW = {
  mob: 5,
  pc: 4
};
const CARD_SIZE = {
  mob: 0.28,
  pc: 0.32,
  // pc: 0.25
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
    }
  },
  data() {
    return {
      dr: new Draggable(),
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
      return {
        x: this.dataAccumulatedDragTranslate.x,
        y: this.dataAccumulatedDragTranslate.y
      };
    },
    position() {
      const MAX_ROW = CARDS_ROW[this.DEVICE] || 6;
      const MAX_COL = Math.ceil(this.$parent.CARD_AMOUNT.need[this.DEVICE] / MAX_ROW) || 3;
      const row = (this.pos - 1) % MAX_ROW;
      const col = (Math.floor((this.pos - 1) / MAX_ROW)) % MAX_COL;

      function translateYOffset(col) {
        if (col % 2 === 1) return 0.5;
        else return 0;
      }
      const translateXOffset = 0.3;
      const CARD_WIDTH = window.innerHeight * CARD_SIZE[this.DEVICE] * 0.75;
      const CARD_HEIGHT = window.innerHeight * CARD_SIZE[this.DEVICE];

      const initialTop = (row - translateYOffset(col) + this.loop.row) * CARD_HEIGHT;
      const initialLeft = (col - translateXOffset + this.loop.col) * CARD_WIDTH;

      return {
        top: initialTop,
        left: initialLeft,
      }
    },
  },
  watch: {
    dragTranslate: {
      handler(value) {
        const dragTranslateX = value ? value.x : 0;
        const dragTranslateY = value ? value.y : 0;
        this.dataAccumulatedDragTranslate.x += dragTranslateX * 1;
        this.dataAccumulatedDragTranslate.y += dragTranslateY * 1;
      },
    }
  },
  methods: {
    handleCardClick() {
      this.$store.dispatch('updatedCardCurrendIndex', this.index);
      this.$store.dispatch('updatedCardEnterMode', true);
    },
    handleDraggableMove: _debounce(function(evt) {
      const vm = this;
      const mirroTranslate = evt.data.mirror.style.transform;
      function parseTranslate(t) {
        const temp = t.split(',');
        const tempX = temp[0].split('(')[1].split('px')[0];
        const tempY = temp[1].split('px')[0];

        return { x: +tempX - vm.position.left, y: +tempY - vm.position.top }
      }
      const t = parseTranslate(mirroTranslate);
      this.dragTranslate = t;
    }, 100),
    initialDraggable() {
      const container = document.querySelector(`#card-${this.pos}`);
      const draggable = new Draggable(container, {
        draggable: '.card-cover',
        placedTimeout: 800,
      });

      function preventDefaultTouchmove() {
        event.preventDefault();
      }
      draggable.on('mirror:created', () => {
        container.addEventListener('touchmove', preventDefaultTouchmove)
      });
      draggable.on('mirror:move', this.handleDraggableMove);
      draggable.on('drag:over', () => {
        container.removeEventListener('touchmove', preventDefaultTouchmove)
      });
    },
  },
  mounted() {
    this.initialDraggable();

    if (+this.pos === 1) {
      const MAX_ROW = CARDS_ROW[this.DEVICE];
      this.loop.row += MAX_ROW;
      this.loop.col += Math.ceil(this.$parent.CARD_AMOUNT.need[this.DEVICE] / MAX_ROW);
    }
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
  padding: 3vh;
  cursor: pointer;
  @include clean-tap;

  transition: transform .666s;

  @include pc {
    width: 24vh;
    height: 32vh;
  }

  &.card--active {}
  .card-cover {
    position: relative;
    width: 100%;
    height: 100%;
    img {
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>