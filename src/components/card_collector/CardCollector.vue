<template lang="pug">
section.card-collector#card-collector(v-if="isDataReady" :class="{ 'card-collector--disabled': shouldCollectorHide }")
  article.cards#cards
    .cards-bg(:class="{ 'cards-bg--active': $store.state.cardCollector.enterMode }" :style="{ backgroundImage: cardsBg}")
    Card(
      v-for="i in CARD_AMOUNT.need[DEVICE]" :key="i" :pos="i" :index="(i - 1)%CARD_AMOUNT.own+1" :expection="CARDS_INFO[CARDS_INFO_TABLE[(i - 1)%CARD_AMOUNT.own+1]].expection" :truth="CARDS_INFO[CARDS_INFO_TABLE[(i - 1)%CARD_AMOUNT.own+1]].truth"
    )
  Exit
  div.card-collector__entrance-container(:class="{ 'card-collector-container--active': $store.state.isEnterMainContent }")
    Entrance
</template>

<script>
import { autoResize_2 } from '@/mixins/masterBuilder.js';
import { ErikoScroller } from 'eriko-scroller.js';
import { ErikoDragger } from '@/utils/eriko-dragger.js';
import _debounce from 'lodash.debounce';
import axios from 'axios';

import Card from '@/components/card_collector/Card.vue';
import Entrance from '@/components/card_collector/Entrance.vue';
import Exit from '@/components/card_collector/Exit.vue';

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
      ticking: false,
      es: new ErikoScroller(),
      ed: new ErikoDragger(),
      shouldCollectorHide: false,
      isDataReady: false,
      CARD_AMOUNT: null,
      CARDS_INFO_TABLE: null,
      CARDS_INFO: null
    }
  },
  computed: {
    DEVICE() {
      return this.isMob ? 'mob' : 'pc';
    },
    cardsBg() {
      const url = require(`~/img/illus/bg/${this.$store.state.cardCollector.currentIndex}/${this.isMob ? 'mob' : 'pc'}.jpg`);
      return `url(${url})`;
    }
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
      console.log(edInfo);
    },
    handleDragMovingEvent() {
      if (!this.ticking) {
        window.requestAnimationFrame(() => {
          // console.log('moving' + evt);
          this.ticking = false;
        });
      }
      this.ticking = true;
    },
    handleDragEndEvent() {

    },
    initialData() {
      axios.get('./data/collector_config.json')
        .then(res => {
          if (res.request.readyState && res.status === 200) {
            const json = JSON.parse(JSON.stringify(res.data));
            this.CARD_AMOUNT = json.CARD_AMOUNT;
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
      await this.ed.launch();
    }
  },
  mounted() {
    this.initialData();
    this.es.addScrollEvent(this.handleScrollEvent);
  },
  destroyed() {
    this.es.removeScrollEvent(this.handleScrollEvent);
  },
}
</script>

<style lang="scss">
.card-collector {
  position: relative;
  width: 100%;
  height: 100vh;
  transition: 1s;

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