<template lang="pug">
article.card.cards-info(
    :class="{'cards-info--active': $store.state.isFocusOneCard}"
  )
    button.card__back-interface__close-bottom(
      @click="handleCardCloseClick()"
      aria-label="close"
      name="close"
    )
      Cross
    button.card__back-interface__next-bottom(
      @click="handleCardNextClick()"
      aria-label="next"
      name="next"
    )
      Arrow(v-if="deviceType === 'pc'" dir="right")
      Arrow(v-else dir="down")
    button.card__back-interface__prev-bottom(
      @click="handleCardPrevClick()"
      aria-label="prev"
      name="prev"
    )
      Arrow(v-if="deviceType === 'pc'" dir="left")
      Arrow(v-else dir="up")
    p.card__back-interface__expection(
      :class="{'--show-opacity': $store.state.isFocusOneCard}"
    ) 台灣教育期待：...<br>{{cardInfo.expection}}
    p.card__back-interface__truth(
      :class="{'--show-opacity': $store.state.isFocusOneCard}"
    ) 現實是：{{cardInfo.truth}}
</template>

<script>
import { autoResize_3, sendGaMethods } from '@/mixins/masterBuilder.js';

import Arrow from './Arrow.vue';
import Cross from './Cross.vue';

const skipCardList = [3, 5, 8, 10, 13];

export default {
  name: 'CardInfo',
  mixins: [autoResize_3, sendGaMethods],
  components: {
    Arrow,
    Cross,
  },
  props: {
    CARDS_INFO: {
      type: Object,
      required: true
    },
    CARDS_INFO_TABLE: {
      type: Object,
      required: true
    },
    CARD_OWN: {
      type: Number,
      required: true
    },
  },
  data() {
    return {
      gaTimer: null,
      residenceTime: 1
    }
  },
  computed: {
    cardInfo() {
      if (this.$store.state.cardActiveIndex < 1) return { expection: null, truth: null };

      const info = this.CARDS_INFO[this.CARDS_INFO_TABLE[(this.$store.state.cardActiveIndex - 1) % this.CARD_OWN + 1]];
      const expection = info.expection;
      const truth = info.truth;

      return { expection, truth };
    },
    isFocusOneCard() {
      return this.$store.state.isFocusOneCard;
    }
  },
  watch: {
    isFocusOneCard: {
      handler(v) {
        if (v) {
          this.sendGA({
            category: 'close',
            action: 'click',
            label: `停留${(this.residenceTime - 1) * 10}~${this.residenceTime * 10}秒`
          });
          this.gaTimer = setInterval(() => {
            this.sendGA({
              category: 'close',
              action: 'click',
              label: `停留${(this.residenceTime - 1) * 10}~${this.residenceTime * 10}秒`
            });
            this.residenceTime++;
          }, 10000);
        } else {
          clearInterval(this.gaTimer);
          this.residenceTime = 1;
        }
      }
    }
  },
  methods: {
    handleCardCloseClick() {
      this.$store.dispatch('updatedIsFocusOneCard', false);
      this.sendGA({
        category: 'close',
        action: 'click',
        label: this.$store.state.cardActiveIndex
      });
    },
    handleCardNextClick() {
      const infoLength = Object.keys(this.CARDS_INFO_TABLE).length;
      let newIndex = this.$store.state.cardActiveIndex + 1 > infoLength ? 1 : this.$store.state.cardActiveIndex + 1;

      if (skipCardList.includes(newIndex)) newIndex++;
      
      this.$store.dispatch('updatedCardActiveIndex', newIndex);
      this.sendGA(this.formatGA('CardNextClick'));
    },
    handleCardPrevClick() {
      const infoLength = Object.keys(this.CARDS_INFO_TABLE).length;
      let newIndex = this.$store.state.cardActiveIndex - 1 < 1 ? infoLength : this.$store.state.cardActiveIndex - 1;

      if (skipCardList.includes(newIndex)) newIndex--;
      this.$store.dispatch('updatedCardActiveIndex', newIndex);
      this.sendGA(this.formatGA('CardPrevClick'));
    },
  },
}
</script>

<style lang="scss" scoped>
.cards-info {
  will-change: transform;
  pointer-events: none;
  z-index: 5000;
  left: 50%;
  top: 45%;
  width: 90vw;
  height: 320px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background-color: #ffffff;
  opacity: 0;
  transform: translate(-50%, -50%) scale(0) rotateY(-180deg);
  // transform: translate(-50%, -50%) scale(0);
  transition: .333s;
  cursor: default;
  @include pad {
    width: 80vw;
    padding: 40px 80px;
  }
  @include pc {
    top: 50%;
    width: 640px;
    height: 320px;
    padding: 80px;
  }
  &.cards-info--active {
    pointer-events: auto;
    opacity: 1;
    transition: .666s .5s;
    transform: translate(-50%, -50%);
  }



  .card__back-interface__expection {
    opacity: 0;
    color: #e54848;
    margin-bottom: 1rem;
  }
  .card__back-interface__truth {
    opacity: 0;
    color: #121428;
    font-weight: bold;
  }
  p {
    @include pc {
      font-size: 1.315rem;
    }
  }
  .card__back-interface__close-bottom {
    position: absolute;
    top: 5px;
    right: 5px;
    width: 35px;
    height: 35px;
    padding: 8px;
    @include clean-btn;
  }
  .card__back-interface__next-bottom, .card__back-interface__prev-bottom {
    box-sizing: content-box;
    position: absolute;
    left: 50%;
    width: 24px;
    height: 24px;
    padding: 24px;
    @include clean-btn;
  }
  .card__back-interface__next-bottom {
    top: -8px;
    transform: translate(-50%, -100%);
    @include pc {
      right: -8px;
      top: 50%;
      left: auto;
      transform: translate(100%, -50%);
    }
  }
  .card__back-interface__prev-bottom {
    bottom: -8px;
    transform: translate(-50%, 100%);
    @include pc {
      left: -8px;
      top: 50%;
      bottom: auto;
      transform: translate(-100%, -50%);
    }
  }
}


.--show-opacity {
  opacity: 1 !important;
  transition: .333s .666s;
}
</style>