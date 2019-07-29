<template>
  <div id="app">
    <a-header/>
    <router-view/>
  </div>
</template>

<script>
  import AHeader from './components/Header.vue';

  export default {
    components: {
      AHeader,
    },
  };
</script>
