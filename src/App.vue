<template>
  <div id="app">
    <overlay/>
    <a-header/>
    <router-view/>
  </div>
</template>

<script>
  import Overlay from '@/components/Overlay.vue';
  import AHeader from '@/components/Header.vue';

  export default {
    components: {
      Overlay,
      AHeader,
    },
  };
</script>
