<template>
  <component
    :is="el"
    :to="to"
    @click="$emit('click')"
  >
    {{ text }}
  </component>
</template>

<script>
  export default {
    name: 'Button',
    props: {
      text: {
        type: String,
        required: true
      },
      el: {
        type: String,
        default: 'button'
      },
      to: {
        type: String,
        default: ''
      }
    }
  };
</script>

<style lang="scss" scoped>
  button,
  a {
    background-color: #333;
    color: #fff;
    font-size: 18px;
    min-width: 250px;
    height: 60px;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    &:disabled {
      opacity: .5;
    }

    &:hover:not(:disabled),
    &:focus:not(:disabled) {
      opacity: .9;
    }
  }

  @media screen and (max-width: 767px) {
    button,
    a {
      width: 100%;
    }
  }
</style>
