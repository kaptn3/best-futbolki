<template>
  <div>
    <overlay/>
    <a-header/>
    <nuxt />
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
