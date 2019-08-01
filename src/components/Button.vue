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
        required: true,
      },
    },
  };
</script>

<style lang="scss" scoped>
  button {
    padding: 0;
    outline: none;
    background-color: #333;
    border: none;
    color: #fff;
    font-size: 18px;
    width: 250px;
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
