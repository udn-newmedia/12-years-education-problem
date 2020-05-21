<template lang="pug">
section.card-collector#card-collector(:class="{ 'card-collector--disabled': shouldCollectorHide }")
  div.card-collector__bg
    div#bg-stars
    div#bg-stars-2
    div#bg-stars-3
  article.cards#cards(v-if="isDataReady")
    .cards-bg(:class="{ 'cards-bg--active': $store.state.cardCollector.enterMode }" :style="{ backgroundImage: cardsBg}")
    Card(
      v-for="i in CARD_AMOUNT.need[DEVICE]" :key="i" :pos="i" :index="(i - 1)%CARD_AMOUNT.own+1" :expection="CARDS_INFO[CARDS_INFO_TABLE[(i - 1)%CARD_AMOUNT.own+1]].expection" :truth="CARDS_INFO[CARDS_INFO_TABLE[(i - 1)%CARD_AMOUNT.own+1]].truth"
    )
  Exit
  div.card-collector__entrance-container(:class="{ 'card-collector-container--active': $store.state.isEnterMainContent }")
    Entrance
  //- div#dragger.dragger(:class="{ 'dragger--disabled': false }")
</template>

<script>
import ErikoScroller from '@/utils/scrollEvent.js';
import _debounce from 'lodash.debounce';
import { autoResize_2 } from '@/mixins/masterBuilder.js';
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
      es: new ErikoScroller(),
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
    },
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
@import '~/style/stars.sass';

.card-collector {
  position: relative;
  width: 100%;
  height: 100vh;
  transition: 1s;
  background: radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%);

  &.card-collector--disabled {
    visibility: hidden;
  }
  .card-collector__bg {
    position: relative;
    pointer-events: none;
    height: 0;
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

// #dragger.dragger {
//   position: absolute;
//   left: 0;
//   top: 0;
//   width: 100%;
//   height: 100%;
//   @include clean-tap;
//   &.dragger--disabled {
//     pointer-events: none;
//   }
// }

// .draggable-source--is-dragging {
//   display: none;
// }

// .draggable-mirror {
//   transition: 0.5s;
// }
</style>