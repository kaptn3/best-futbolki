<template>
  <div id="app">
    <overlay/>
    <a-header/>
    <router-view/>
  </div>
</template>

<script>
  import Overlay from '@/components/Overlay';
  import AHeader from '@/components/Header';

  export default {
    components: {
      Overlay,
      AHeader
    }
  };
</script>
