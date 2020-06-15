<template lang="pug">
  div.arrow
    div.arrow-line(:class="arrowLineLeftClassAttr")
    div.arrow-line(:class="arrowLineRightClassAttr")
</template>

<script>
export default {
  props: {
    dir: {
      type: String,
      default: 'up'
    }
  },
  computed: {
    arrowLineLeftClassAttr() {
      return {
        'arrow-line__left--up-side': this.dir === 'up',
        'arrow-line__left--down-side': this.dir === 'down',
        'arrow-line__left--left-side': this.dir === 'left',
        'arrow-line__left--right-side': this.dir === 'right'
      }
    },
    arrowLineRightClassAttr() {
      return {
        'arrow-line__right--up-side': this.dir === 'up',
        'arrow-line__right--down-side': this.dir === 'down',
        'arrow-line__right--left-side': this.dir === 'left',
        'arrow-line__right--right-side': this.dir === 'right'
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.arrow {
  position: relative;
  width: 100%;
  height: 100%;
  transition: .111s;
  @include pc {
    &:hover {
      transform: scale(1.2);
    }
  }
  .arrow-line {
    box-sizing: content-box;
    position: absolute;
    padding: 1.5px;
    height: 60%;
    background-color: #fcfcfc;
  }



  .arrow-line__left--down-side {
    top: 0;
    left: 50%;
    transform: translate(calc(-50% + 0.5px), 50%) rotate(45deg);
    transform-origin: center 0;
  }
  .arrow-line__right--down-side {
    top: 0;
    left: 50%;
    transform: translate(calc(-50% - 0.5px), 50%) rotate(-45deg);
    transform-origin: center 0;
  }



  .arrow-line__left--up-side {
    bottom: 0;
    left: 50%;
    transform: translate(calc(-50% + 0.5px), -50%) rotate(-45deg);
    transform-origin: center bottom;
  }
  .arrow-line__right--up-side {
    bottom: 0;
    left: 50%;
    transform: translate(calc(-50% - 0.5px), -50%) rotate(45deg);
    transform-origin: center bottom;
  }



  .arrow-line__left--left-side {
    top: 0;
    left: 50%;
    transform: translateY(0.5px) rotate(45deg);
    transform-origin: center top;
  }
  .arrow-line__right--left-side {
    bottom: 0;
    left: 50%;
    transform: translateY(-0.5px) rotate(-45deg);
    transform-origin: center bottom;
  }




  .arrow-line__left--right-side {
    bottom: 0;
    left: 50%;
    transform: translateY(-0.5px) rotate(45deg);
    transform-origin: center bottom;
  }
  .arrow-line__right--right-side {
    top: 0;
    left: 50%;
    transform: translateY(0.5px) rotate(-45deg);
    transform-origin: center top;
  }
}
</style>