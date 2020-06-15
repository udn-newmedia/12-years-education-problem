<template lang="pug">
  div.loader
</template>

<script>
export default {
  name: 'Loader'
}
</script>

<style>
.loader {
  position: absolute;
  left: 50%;
  top: 50%;
  border: 8px solid #f3f3f3;
  border-radius: 50%;
  border-top: 8px solid #93acff;
  width: 72px;
  height: 72px;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}
</style>