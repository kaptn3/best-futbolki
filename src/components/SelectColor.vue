<template>
  <div>
    <span class="current-color">Color: <b>{{ color }}</b></span>
    <label
      v-for="(item, index) in colors"
      :for="item"
      :key="index"
    >
      <input
        :id="item"
        :value="item"
        :checked="index === 0"
        @input="changeColor($event.target.value)"
        name="color"
        type="radio"
      >
      <span class="color">
        <span
          :style="{ 'background-color': item }"
          class="color-inside"
        />
      </span>
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
        color: '',
      };
    },
    methods: {
      changeColor(value) {
        this.color = value;
        this.$emit('model', value);
      },
    },
    mounted() {
      [this.color] = this.colors;
    },
  };
</script>

<style lang="scss" scoped>
  label {
    margin-right: 10px;
    display: inline-block;
  }

  input {
    appearance: none;
  }

  .current-color {
    display: block;
    font-size: 14px;
    color: #4f4f4f;
    margin-bottom: 15px;
  }

  .color,
  .color-inside {
    display: inline-block;
    border-radius: 100%;
  }

  .color {
    width: 40px;
    height: 40px;
    padding: 2px;
    border: 1px solid transparent;
    border-radius: 100%;
  }

  .color-inside {
    width: 100%;
    height: 100%;
  }

  .color:hover,
  .color:focus {
    border-color: #bdbdbd;
  }

  input:checked ~ .color {
    border-color: #333;
  }
</style>
