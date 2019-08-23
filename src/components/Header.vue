<template>
  <header class="header">
    <div class="container header__container">
      <logotype/>
      <right-nav/>
    </div>
  </header>
</template>

<script>
  import Logotype from './Logotype';
  import RightNav from './RightNav';

  export default {
    name: 'Header',
    components: {
      Logotype,
      RightNav
    }
  };
</script>

<style lang="scss" scoped>
  .header {
    background-color: #f2f2f2;

    &__container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 54px;
    }
  }
</style>
