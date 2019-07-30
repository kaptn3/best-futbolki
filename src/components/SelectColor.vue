<template>
  <div>
    <label
      v-for="(item, index) in colors"
      :for="item"
      :key="index"
    >
      <input
        :id="item"
        :value="item"
        :checked="index === 0"
        @input="$emit('model', $event.target.value)"
        name="color"
        type="radio"
      >
      <span :style="{ 'background-color': item }"/>
    </label>
  </div>
</template>

<script>
  export default {
    name: 'SelectColor',
    props: {
      colors: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        da: '',
      };
    },
  };
</script>
