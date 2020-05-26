<template lang="pug">
article.card.cards-info(
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
</template>

<script>
export default {
  name: 'CardInfo',
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
  computed: {
    cardInfo() {
      if (this.$store.state.cardActiveIndex < 1) return { expection: null, truth: null };

      const info = this.CARDS_INFO[this.CARDS_INFO_TABLE[(this.$store.state.cardActiveIndex - 1) % this.CARD_OWN + 1]];
      const expection = info.expection;
      const truth = info.truth;

      return { expection, truth };
    },
  },
  methods: {
    handleCardCloseClick() {
      this.$store.dispatch('updatedIsFocusOneCard', false);
    },
    handleCardNextClick() {
      const infoLength = Object.keys(this.CARDS_INFO_TABLE).length;
      const newIndex = this.$store.state.cardActiveIndex + 1 > infoLength ? 1 : this.$store.state.cardActiveIndex + 1;
      this.$store.dispatch('updatedCardActiveIndex', newIndex);      
    },
    handleCardPrevClick() {
      const infoLength = Object.keys(this.CARDS_INFO_TABLE).length;
      const newIndex = this.$store.state.cardActiveIndex - 1 < 1 ? infoLength : this.$store.state.cardActiveIndex - 1;
      this.$store.dispatch('updatedCardActiveIndex', newIndex);
    },
  },
}
</script>

<style lang="scss" scoped>
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
  opacity: 0;
  transform: translate(-50%, -50%) scale(0);
  transition: .333s;
  @include pc {
    width: 640px;
    height: 320px;
    padding: 80px;
  }
  &.cards-info--active {
    pointer-events: auto;
    opacity: 1;
    transition: 1s;
    transform: translate(-50%, -50%) scale(1);
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
}


.--show-opacity {
  opacity: 1 !important;
}
</style>