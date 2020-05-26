<template lang="pug">
section.card-collector#card-collector(
  v-if="isDataReady"
  :class="{ 'card-collector--disabled': shouldCollectorHide }"
  draggable=false
)
  article.cards#cards(
    :class="{'cards--on-dragging': isOnDragging, '--disabled-pointer': $store.state.isEnterMainContent}"
    draggable=false
  )
    //- TODO: 淡入淡出順一點
    .cards-bg(
      :class="{'cards-bg--active': $store.state.isFocusOneCard}"
      :style="{backgroundImage: cardsBg}"
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
    .card.cards-info(
      :class="{'cards-info--active': $store.state.isFocusOneCard}"
    )
      button.card__back-interface__close-bottom(@click="handleCardCloseClick()") close
      button.card__back-interface__next-bottom(@click="handleCardNextClick()") next
      button.card__back-interface__prev-bottom(@click="handleCardPrevClick()") prev
      p.card__back-interface__expection(
        :class="{'--show-opacity': $store.state.isFocusOneCard}"
      ) 新課綱希望...<br>{{cardInfo.expection}}
      p.card__back-interface__truth(
        :class="{'--show-opacity': $store.state.isFocusOneCard}"
      ) 現實是：{{cardInfo.truth}}
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
      if (this.$store.state.cardActiveIndex < 1) return;
      const url = require(`~/img/illus/bg/${this.$store.state.cardActiveIndex}/${this.isMob ? 'mob' : 'pc'}.jpg`);
      return `url(${url})`;
    },
    cardInfo() {
      if (
        !this.CARDS_INFO ||
        !this.CARDS_INFO_TABLE ||
        !this.CARD_OWN ||
        this.$store.state.cardActiveIndex < 1
      ) return { expection: null, truth: null };

      const info = this.CARDS_INFO[this.CARDS_INFO_TABLE[(this.$store.state.cardActiveIndex - 1) % this.CARD_OWN + 1]];
      const expection = info.expection;
      const truth = info.truth;

      return { expection, truth };
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
    handleCardCloseClick() {
      this.$store.dispatch('updatedIsFocusOneCard', false);
    },
    handleCardNextClick() {
      const infoLength = Object.keys(this.CARDS_INFO).length;
      const newIndex = this.$store.state.cardActiveIndex + 1 > infoLength ? 1 : this.$store.state.cardActiveIndex + 1;
      this.$store.dispatch('updatedCardActiveIndex', newIndex);
    },
    handleCardPrevClick() {
      const infoLength = Object.keys(this.CARDS_INFO).length;
      const newIndex = this.$store.state.cardActiveIndex - 1 < 1 ? infoLength : this.$store.state.cardActiveIndex - 1;
      this.$store.dispatch('updatedCardActiveIndex', newIndex);
    },
    handleDragStartEvent(edInfo) {
      edInfo
    },
    handleDragMovingEvent(edInfo) {
      this.isOnDragging = true;
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
    transition: .666s .333s ease-in-out;
    &.cards-bg--active {
      opacity: 1;
      transform: translateY(0) rotateX(-180deg);
    }
  }

  .cards-info {
    pointer-events: none;
    z-index: 5000;
    left: 50%;
    top: 50%;
    width: 90vw;
    height: 320px;
    padding: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    background-color: #ffffff;
    transform: translate(-50%, -50%);
    opacity: 0;
    @include pc {
      width: 640px;
      height: 320px;
      padding: 80px;
    }
    &.cards-info--active {
      pointer-events: auto;
      animation: rotate-in .666s ease-in-out forwards;
      @keyframes rotate-in {
        0% {
          opacity: .5;
          transform: translate(-50%, -50%) rotateY(180deg);
        }
        50% {
          opacity: .75;
          transform: translate(-50%, -50%) rotateY(90deg);
        }
        100% {
          opacity: 1;
          transform: translate(-50%, -50%) rotateY(0deg);
        }
      }
    }
    .card__back-interface__close-bottom {
      position: absolute;
      top: 0;
      right: 0;
    }
    .card__back-interface__next-bottom {
      position: absolute;
      left: 50%;
      top: 0;
      transform: translate(-50%, -100%);
      @include pc {
        right: 0;
        top: 50%;
        left: auto;
        transform: translate(100%, -50%);
      }
    }
    .card__back-interface__prev-bottom {
      position: absolute;
      left: 50%;
      bottom: 0;
      transform: translate(-50%, 100%);
      @include pc {
        left: 0;
        top: 50%;
        bottom: auto;
        transform: translate(-100%, -50%);
      }
    }
    .card__back-interface__expection {
      opacity: 0;
      color: #e54848;
      margin-bottom: 1rem;
      transition: .666s .666s;
    }
    .card__back-interface__truth {
      opacity: 0;
      color: #121428;
      font-weight: bold;
      transition: .666s .666s;
    }
    p {
      @include pc {
        font-size: 1.315rem;
      }
    }
  }
}

.--active-pointer {
  pointer-events: auto !important;
}
.--disabled-pointer {
  pointer-events: none !important;
}
.--show-opacity {
  opacity: 1 !important;
}
</style>