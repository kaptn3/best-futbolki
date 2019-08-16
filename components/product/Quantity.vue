<template>
  <label for="quantity">
    <span>Quantity</span>
    <input
      id="quantity"
      type="number"
      name="quantity"
      min="1"
      max="100"
      :value="value"
      @input="$emit('input', Number($event.target.value))"
    >
  </label>
</template>

<script>
  export default {
    name: 'Quantity',
    props: {
      value: {
        type: Number,
        default: 1
      }
    }
  };
</script>

<style lang="scss" scoped>
  label {
    display: block;
  }

  span {
    display: block;
    color: #4f4f4f;
    margin-bottom: 2px;
    font-size: 1rem;
  }

  input {
    width: 50px;
    background: transparent;
    border: none;
    border-bottom: 1px solid #bdbdbd;
    height: 1.7rem;
    line-height: 1.7rem;
    outline: none;
    display: block;
    font-size: 18px;
  }

  @media screen and (max-width: 565px) {
    span {
      font-size: 12px;
    }
  }
</style>
