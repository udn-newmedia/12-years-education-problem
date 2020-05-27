<template lang="pug">
  div.cross
    div.cross-line.cross-line--left
    div.cross-line.cross-line--right
</template>

<script>
export default {
  name: 'Cross'
};
</script>

<style lang="scss" scoped>
.cross {
  position: relative;
  width: 100%;
  height: 100%;
  transition: .333s;
  &:hover {
    transform: scale(1.2);
  }
  .cross-line {
    box-sizing: content-box;
    position: absolute;
    top: 0;
    padding: 1.5px;
    height: 141.42%;
    background-color: #a0302c;
    transform-origin: center 0;
    transition: .333s;
  }
  .cross-line--left {
    transform: translateX(calc(100% - 0.5px)) rotate(45deg);
    right: 0;
  }
  .cross-line--right {
    transform: translateX(calc(-100%)) rotate(-45deg);
    left: 0;
  }
}
</style>