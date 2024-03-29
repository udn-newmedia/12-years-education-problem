<template lang="pug">
section.card-collector#card-collector(
  v-if="isDataReady"
  :class="cardCollectorClassAttr"
  draggable=false
)
  article.cards#cards(
    :class="cardsClassAttr"
    draggable=false
  )
    CardBg(
      v-for="i in Object.keys(CARDS_INFO_TABLE)"
      :key="`card-bg${i}`"
      :index="+i"
    )
    Card(
      v-for="i in CARD_NEED"
      :key="i"
      :pos="i"
      :index="(i - 1)%CARD_OWN+1"
      :translate="cardsTranslate"
      :cardsRow="CARDS_ROW"
      :cardSize="CARD_SIZE"
      :cardNeed="CARD_NEED"
      :isOnDragging="isOnDragging"
    )
    CardInfo(
      :CARDS_INFO="CARDS_INFO"
      :CARDS_INFO_TABLE="CARDS_INFO_TABLE"
      :CARD_OWN="CARD_OWN"
    )
  Loader(v-if="!isWindowComplete")
  Exit
  div.card-collector__entrance-container(
    :class="{'--active-pointer': $store.state.isEnterMainContent }"
  )
    Entrance
</template>

<script>
import { autoResize_2 } from '@/mixins/masterBuilder.js';
import { ErikoScroller } from 'eriko-scroller.js';
import { ErikoDragger } from 'eriko-dragger.js';
import _debounce from 'lodash.debounce';
import axios from 'axios';

import Card from '@/components/collector/assemblies/Card.vue';
import CardBg from '@/components/collector/assemblies/CardBg.vue';
import CardInfo from '@/components/collector/assemblies/CardInfo.vue';
import Entrance from '@/components/collector/assemblies/Entrance.vue';
import Exit from '@/components/collector/assemblies/Exit.vue';
import Loader from '@/components/Loader.vue';

const CARD_SIZE = {
  mob: 0.28,
  pc: 0.32,
}

export default {
  name: 'CardCollector',
  mixins: [autoResize_2],
  components: {
    Card,
    CardBg,
    CardInfo,
    Entrance,
    Exit,
    Loader,
  },
  data() {
    return {
      es: new ErikoScroller(),
      ed: new ErikoDragger(),
      shouldCollectorHide: false,
      isDataReady: false,
      isWindowComplete: false,
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
    cardCollectorClassAttr() {
      return {
        'card-collector--disabled': this.shouldCollectorHide,
        'card-collector--disabled-touch-action': this.$store.state.isEnterCollector
      };
    },
    cardsClassAttr() {
      return {
        'cards--on-dragging': this.isOnDragging,
        'cards--loaded': !this.isWindowComplete,
        '--disabled-pointer': this.$store.state.isEnterMainContent
      };
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
    handleDragStartEvent() {
      return;
    },
    handleDragMovingEvent(edInfo) {
      this.isOnDragging = true;
      if (!edInfo.dragTranslate || edInfo.dragDuration > 1500) return;
      if (
        edInfo.dragTranslate.x === this.cardsTranslate.x &&
        edInfo.dragTranslate.y === this.cardsTranslate.y
      ) return;

      this.cardsTranslate = {
        x: edInfo.dragTranslate.x || this.cardsTranslate.x,
        y: edInfo.dragTranslate.y || this.cardsTranslate.y
      };
    },
    handleDragEndEvent() {
      this.isOnDragging = false;
    },
    handleWindowComplete() {
      this.isWindowComplete = true;
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
  destroyed() {
    this.ed.removeDragger();
    this.es.removeScrollEvent(this.handleScrollEvent);
  },
  created() {
    this.isWindowComplete = true;
    // window.addEventListener("load", this.handleWindowComplete);
    this.$nextTick(() => {
      this.initialData();
      this.es.addScrollEvent(this.handleScrollEvent);
    });
  },
}
</script>

<style lang="scss">
.card-collector {
  position: relative;
  width: 100%;
  height: 100vh;
  transition: 1s;
  @include clean-tap;
  @include clean-drag;
  &.card-collector--disabled {
    visibility: hidden;
  }
  &.card-collector--disabled-touch-action {
    touch-action: none;
    @include pc {
      touch-action: auto;
    }
  }


  .card-collector__entrance-container {
    position: absolute;
    pointer-events: none;
    z-index: 10;
    left: 50%;
    top: 15%;
    transform: translateX(-50%);
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
  @include clean-tap;
  ::selection {
    background: transparent;
    cursor: pointer;
  }
  &.cards--loaded {
    pointer-events: none;
    opacity: 0.2;
  }
  &.cards--on-dragging {
    cursor: pointer;
  }
}



.--active-pointer {
  pointer-events: auto !important;
}
.--disabled-pointer {
  pointer-events: none !important;
}
</style>