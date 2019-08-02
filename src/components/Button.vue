<template>
  <button @click="$emit('click')">
    {{ text }}
  </button>
</template>

<script>
  export default {
    name: 'Button',
    props: {
      text: {
        type: String,
        required: true
      }
    }
  };
</script>

<style lang="scss" scoped>
  button {
    background-color: #333;
    color: #fff;
    font-size: 18px;
    min-width: 250px;
    height: 60px;

    &:hover,
    &:focus {
      opacity: .9;
    }
  }

  @media screen and (max-width: 767px) {
    button {
      width: 100%;
    }
  }
</style>
