<template>
  <div
    v-if="$store.state.modalVisible"
    @click.self="hide"
  />
</template>

<script>
  export default {
    name: 'Overlay',
    methods: {
      hide() {
        this.$store.commit('toggleModal', null);
      }
    }
  };
</script>

<style scoped>
  div {
    height: 100vh;
    width: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 3;
    position: fixed;
  }
</style>
