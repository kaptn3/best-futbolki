<template>
  <div>
    <span class="current-color">Color: <b>{{ item }}</b></span>
    <input
      class="current-color-alias"
      :value="alias"
      hidden
    >
    <label
      v-for="(color, index) in itemData"
      :key="index"
      :for="'color-' + color.id"
    >
      <input
        :id="'color-' + color.id"
        :value="color.id"
        :checked="index === 0"
        name="color"
        type="radio"
        @input="changeItem($event.target.value)"
      >
      <span class="color">
        <span
          :style="getBackground(color.rgb)"
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
        required: true
      },
      res: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        object: 'color'
      };
    },
    methods: {
      getBackground(color) {
        if (color.length === 1) {
          return `background-color: ${color[0]}`;
        }
        return `background-image: linear-gradient(135deg, ${color[0]} 50%, ${color[1]} 50%)`;
      }
    }
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
