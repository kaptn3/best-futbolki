<template>
  <div>
    <span class="current-color">Color: <b>{{ item }}</b></span>
    <label
      v-for="(color, index) in itemData"
      :for="'color-' + color.id"
      :key="index"
    >
      <input
        :id="'color-' + color.id"
        :value="color.id"
        :checked="index === 0"
        @input="changeItem($event.target.value)"
        name="color"
        type="radio"
      >
      <span class="color">
        <span
          :style="{ 'background-color': color.alias }"
          class="color-inside"
        />
      </span>
    </label>
  </div>
</template>

<script>
  import select from '@/mixins/select';

  export default {
    name: 'SelectColor',
    mixins: [select],
    props: {
      data: {
        type: Array,
        required: true,
      },
      res: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        object: 'color',
      };
    },
  };
</script>

<style lang="scss" scoped>
  label {
    margin-right: 10px;
    margin-bottom: 10px;
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
    border-color: #bdbdbd;
  }

  .color-inside {
    width: 100%;
    height: 100%;
  }

  .color:hover,
  .color:focus {
    border-color: #999;
  }

  input:checked ~ .color {
    border-color: #333;
  }
</style>
