<template lang="pug">
article.chapter-banner
  h2 {{title.replace('^_^', '\n')}}
  table
    tbody
      tr
        td 問題點：
        td {{question}}
      tr
        td 理想上：
        td {{ideal}}
      tr
        td 現實上：
        td {{truth}}
</template>

<script>
export default {
  name: 'ChapterBanner',
  props: {
    title: {
      type: String,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    ideal: {
      type: String,
      required: true,
    },
    truth: {
      type: String,
      required: true,
    }
  }
}
</script>

<style lang="scss" scoped>
.chapter-banner {
  position: relative;
  width: 100%;
  min-height: 100vh;
  border: solid 1px red;

  h2 {
    white-space: pre-wrap;
  }
}
</style>