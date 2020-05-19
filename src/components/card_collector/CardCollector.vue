<template lang="pug">
section.card-collector(:class="{ 'card-collector--disabled': shouldCollectorHide }")
  div.card-collector__bg
    div#bg-stars
    div#bg-stars-2
    div#bg-stars-3

  article.cards#cards
    Card(v-for="item in Object.keys(CARDS_INFO_TABLE)" :key="item" :index="+item" :expection="CARDS_INFO[CARDS_INFO_TABLE[item]].expection" :truth="CARDS_INFO[CARDS_INFO_TABLE[item]].truth")

  Exit
  div.card-collector__entrance-container(:class="{ 'card-collector-container--active': $store.state.isEnterMainContent }")
    Entrance
</template>

<script>
import ErikoScroller from '@/utils/scrollEvent.js';
import { Draggable } from '@shopify/draggable';
import _debounce from 'lodash.debounce';

import Card from '@/components/card_collector/Card.vue';
import Entrance from '@/components/card_collector/Entrance.vue';
import Exit from '@/components/card_collector/Exit.vue';

export default {
  name: 'CardCollector',
  components: {
    Card,
    Entrance,
    Exit
  },
  data() {
    return {
      es: new ErikoScroller(),
      dr: null,
      shouldCollectorHide: false,
      CARDS_INFO_TABLE: {
       1: 1,
       2: 2,
       3: 3,
       4: 3,
       5: 4,
       6: 4,
       7: 5,
       8: 6,
       9: 6,
       10: 7,
       11: 7,
       12: 8,
       13: 9,
       14: 9,
       15: 10,
       16: 11,
       17: 12,
       18: 13,
     },
     CARDS_INFO: {
       1: {
         expection: '學生能活用知識、觸類旁通',
         truth: '台灣的學生很會背誦，卻無法活用'
       },
       2: {
         expection: '學生在學校累積「帶著走的能力」',
         truth: '教師習慣唸課本、塞知識，學生考完即忘'
       },
       3: {
         expection: '學生走出自己的路，不再製造「無動力世代」',
         truth: '社會價值觀拼命將學生往「好學校」、「理想科系」推'
       },
       4: {
         expection: '學生找回學習樂趣，不只為考試而學',
         truth: '分分計較、成績只為升學，學生喪失學習動力和成就感'
       },
       5: {
         expection: '升學看重學習歷程，不用考試決定學生未來',
         truth: '學習歷程變成新版「軍備競賽」，台版《天空之城》上演'
       },
       6: {
         expection: '學生課表更豐富多彩',
         truth: '課綱要求各校開設多元課程，有些學校無力開設，有些學校陽奉陰違'
       },
       7: {
         expection: '縮短城鄉與社經地位造成的教育不平等',
         truth: '偏鄉師資、學生文化刺激皆不足，城鄉差距愈來愈大'
       },
       8: {
         expection: '學生適性揚才，發展出自己的樣貌',
         truth: '「成功」標準單一，教師、家長看重升學大過孩子潛能'
       },
       9: {
         expection: '學生具備在AI時代生存的能力',
         truth: '學生習慣「接收」知識，不擅長駕馭知識'
       },
       10: {
         expection: '培育出賈伯斯，學生有研發、創新能力',
         truth: '教育現場像工廠，培育出一模一樣的孩子'
       },
       11: {
         expection: '未來的年輕人面對高齡化時代，能獨當一面',
         truth: '求學過程缺乏實作、將知識應用於生活的經驗與能力'
       },
       12: {
         expection: '學生能打世界盃，具備跟國際競爭的能力',
         truth: '學生的課業壓力不減，但進入職場卻常被產業嫌棄'
       },
       13: {
         expection: '學生常保好奇心，把世界當成遊樂場',
         truth: '填鴨式的教學，抹煞學生的好奇心'
       },
      }
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
    initialDraggable() {
      const container = document.querySelector('#cards');
      this.dr = new Draggable(container, {
        draggable: '.PillSwitchControl',
        delay: 0,
      });


      // TODO: draggable initial
    }
  },
  mounted() {
    this.es.addScrollEvent(this.handleScrollEvent);
    this.initialDraggable();
  },
  destroyed() {
    this.es.removeScrollEvent(this.handleScrollEvent);
  },
}
</script>

<style lang="scss" scoped>
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
  }
  .card-collector__entrance-container {
    position: absolute;
    z-index: 10;
    left: 50%;
    top: 15%;
    transform: translateX(-50%);
    &.card-collector-container--active {
      opacity: 1;
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
}
</style>