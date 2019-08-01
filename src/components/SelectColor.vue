<template>
  <div>
    <span class="current-color">Color: <b>{{ color }}</b></span>
    <label
      v-for="item in dataColor"
      :for="'color-' + item.id"
      :key="item.id"
    >
      <input
        :id="'color-' + item.id"
        :value="item.id"
        @input="changeColor($event.target.value)"
        name="color"
        type="radio"
      >
      <span class="color">
        <span
          :style="{ 'background-color': item.alias }"
          class="color-inside"
        />
      </span>
    </label>
  </div>
</template>

<script>
  import axios from 'axios';

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
        dataColor: [],
      };
    },
    methods: {
      changeColor(value) {
        this.color = (this.dataColor.filter(color => color.id === value))[0].name;
        this.$emit('model', value);
      },
    },
    watch: {
      colors() {
        axios.get('/js/reference.json').then((response) => {
          const { data } = response;
          this.dataColor = data.color.filter((color) => {
            for (let i = 0; i < this.colors.length; i++) {
              if (this.colors[i] === color.id) {
                return color;
              }
            }
            return false;
          });
          this.color = this.dataColor[0].name;
        }, (error) => {
          console.log(error);
        });
      },
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
    border-color: #bdbdbd;
  }

  input:checked ~ .color {
    border-color: #333;
  }
</style>
