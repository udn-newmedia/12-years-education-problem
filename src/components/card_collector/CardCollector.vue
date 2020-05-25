<template lang="pug">
section.card-collector#card-collector(
  v-if="isDataReady"
  :class="{ 'card-collector--disabled': shouldCollectorHide }"
)
  article.cards#cards(
    :class="{'cards--on-dragging': isOnDragging}"
  )
    .cards-bg(
      :class="{'cards-bg--active': $store.state.cardCollector.enterMode}"
      :style="{backgroundImage: cardsBg}"
    )
    Card(
      v-for="i in CARD_NEED"
      :key="i"
      :pos="i"
      :index="(i - 1)%CARD_OWN+1"
      :expection="CARDS_INFO[CARDS_INFO_TABLE[(i - 1)%CARD_OWN+1]].expection"
      :truth="CARDS_INFO[CARDS_INFO_TABLE[(i - 1)%CARD_OWN+1]].truth"
      :translate="cardsTranslate"
      :cardsRow="CARDS_ROW"
      :cardSize="CARD_SIZE"
      :cardNeed="CARD_NEED"
    )
  Exit
  div.card-collector__entrance-container(
    :class="{'card-collector-container--active': $store.state.isEnterMainContent }"
  )
    Entrance
</template>

<script>
import { autoResize_2 } from '@/mixins/masterBuilder.js';
import { ErikoScroller } from 'eriko-scroller.js';
import { ErikoDragger } from 'eriko-dragger.js';
import _debounce from 'lodash.debounce';
import axios from 'axios';

import Card from '@/components/card_collector/Card.vue';
import Entrance from '@/components/card_collector/Entrance.vue';
import Exit from '@/components/card_collector/Exit.vue';

const CARD_SIZE = {
  mob: 0.28,
  pc: 0.32,
}

export default {
  name: 'CardCollector',
  mixins: [autoResize_2],
  components: {
    Card,
    Entrance,
    Exit
  },
  data() {
    return {
      es: new ErikoScroller(),
      ed: new ErikoDragger(),
      shouldCollectorHide: false,
      isDataReady: false,
      CARD_OWN: null,
      CARDS_INFO_TABLE: null,
      CARDS_INFO: null,
      CARDS_ROW: 5,
      cardsTranslate: {x: 0, y: 0},
      isOnDragging: false,
    }
  },
  computed: {
    DEVICE() {
      return this.isMob ? 'mob' : 'pc';
    },
    CARD_NEED() {
      const col = Math.ceil(window.innerWidth / (window.innerHeight * (this.CARD_SIZE * 0.75) + 0.03));

      return (
        (col % 2 === 0 ? col + 2 : col + 1)

        *

        (this.CARDS_ROW) 
      );
    },
    CARD_SIZE() {
      return CARD_SIZE[this.DEVICE];
    },
    cardsBg() {
      const url = require(`~/img/illus/bg/${this.$store.state.cardCollector.currentIndex}/${this.isMob ? 'mob' : 'pc'}.jpg`);
      return `url(${url})`;
    },
  },
  methods: {
    handleScrollEvent: _debounce(function() {
      if (window.pageYOffset > window.innerHeight * 2) {
        if (!this.shouldCollectorHide) this.shouldCollectorHide = true;
      } else {
        if(this.shouldCollectorHide) this.shouldCollectorHide = false;
      }
    }, 30),
    handleDragStartEvent(edInfo) {
      this.isOnDragging = true;
      edInfo
    },
    handleDragMovingEvent(edInfo) {
      if (!edInfo.dragTranslate) return;
      if (
        edInfo.dragTranslate.x === this.cardsTranslate.x &&
        edInfo.dragTranslate.y === this.cardsTranslate.y
      ) return;

      this.cardsTranslate = {
        x: edInfo.dragTranslate.x || this.cardsTranslate.x,
        y: edInfo.dragTranslate.y || this.cardsTranslate.y
      };
    },
    handleDragEndEvent(edInfo) {
      this.isOnDragging = false;
      edInfo
    },
    initialData() {
      axios.get('./data/collector_config.json')
        .then(res => {
          if (res.request.readyState && res.status === 200) {
            const json = JSON.parse(JSON.stringify(res.data));
            this.CARD_OWN = json.CARD_OWN;
            this.CARDS_INFO_TABLE = json.CARDS_INFO_TABLE;
            this.CARDS_INFO = json.CARDS_INFO;
          }
        })
        .then(() => {
          this.isDataReady = true;
        }) 
        .then(() => {
          this.initialDragger();
        })
    },
    async initialDragger() {
      await this.ed.setContainer('#card-collector');
      await this.ed.setTarget('#cards');
      await this.ed.setStartEvent(this.handleDragStartEvent);
      await this.ed.setMoveEvent(this.handleDragMovingEvent);
      await this.ed.setEndEvent(this.handleDragEndEvent);
      await this.ed.setDebounce(100);
      await this.ed.launch();
    }
  },
  mounted() {
    this.initialData();
    this.es.addScrollEvent(this.handleScrollEvent);
  },
  destroyed() {
    this.ed.removeDragger();
    this.es.removeScrollEvent(this.handleScrollEvent);
  },
}
</script>

<style lang="scss">
.card-collector {
  touch-action: none;
  position: relative;
  width: 100%;
  height: 100vh;
  transition: 1s;
  @include clean-tap;
  &.card-collector--disabled {
    visibility: hidden;
  }

  .card-collector__entrance-container {
    position: absolute;
    pointer-events: none;
    z-index: 10;
    left: 50%;
    top: 15%;
    transform: translateX(-50%);
    &.card-collector-container--active {
      pointer-events: auto;
    }
    @include pad {
      top: 16%;
    }
    @include pc {
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
}

.cards {
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
  ::selection {
    background: transparent;
    cursor: pointer;
  }
  .cards--on-dragging {
    cursor: pointer;
  }
  @include clean-tap;
  .cards-bg {
    position: relative;
    width: 100%;
    height: 100vh;
    opacity: 0;
    transform: translateY(100%);
    transition: .666s ease-in-out;
    &.cards-bg--active {
      opacity: 1;
      transform: translateY(0);
    }
  }
}
</style>