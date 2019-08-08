<template>
  <router-link to="/product">
    <img
      src="/img/logo.svg"
      alt="Logotype"
    >
  </router-link>
</template>

<script>
  export default {
    name: 'Logotype',
  };
</script>

<style scoped>
  a {
    display: block;
  }

  img {
    width: 42px;
  }
</style>
