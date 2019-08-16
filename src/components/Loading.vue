<template>
  <div class="loading">
    <div class="loading__inner"/>
  </div>
</template>

<script>
  export default {
    name: 'Loading'
  };
</script>

<style lang="scss" scoped>
  .loading {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    opacity: .5;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;

    &__inner {
      width: 60px;
      height: 60px;
      background: #4dba87;
      border-radius: 100%;
      animation: bounce 1s infinite linear;
    }
  }

  @keyframes bounce {
    0% {
      width: 60px;
      height: 60px;
    }

    50% {
      width: 20px;
      height: 20px;
    }

    100% {
      width: 60px;
      height: 60px;
    }
  }
</style>
