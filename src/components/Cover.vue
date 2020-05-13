<template lang="pug">
section.cover
  article.cover__block.cover__preamble
    h2 新課綱上路一年<br>理想與現實的差距<br>有多大？
    p 一張張美好明亮的圖卡，<br>是台灣教育對孩子的期待，<br>點按圖卡看現況與理想之間，<br>還有多大的差距。
  div.cover__block.cover__space
  article.cover__block.cover__gate
    h1 無效預算？<br>揭露108課綱&nbsp五大亂象
</template>

<script>
export default {
  name: 'Cover',
}
</script>

<style lang="scss" scoped>
.cover {
  position: relative;
  width: 100%;
  height: 300vh;
  .cover__block {
    width: 100%;
    height: 100vh;
  }
  .cover__preamble {
    background-color: lightyellow;
  }
  .cover__space {
    background-color: lightblue;
  }
  .cover__gate {
    background-color: lightgreen;
  }
}
</style>