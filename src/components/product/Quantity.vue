<template>
  <label for="quantity">
    <span>Quantity</span>
    <input
      type="number"
      name="quantity"
      id="quantity"
      min="1"
      max="100"
      value="1"
      @input="$emit('input', $event.target.value)"
    >
  </label>
</template>

<script>
  export default {
    name: 'Quantity',
  };
</script>

<style lang="scss" scoped>
  span {
    display: block;
    color: #4f4f4f;
    margin-bottom: 2px;
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
</style>
