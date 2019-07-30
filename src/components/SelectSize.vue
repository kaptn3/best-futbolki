<template>
  <div>
    <span class="current-size">Size: <b>{{ size }}</b></span>
    <label
      v-for="(item, index) in sizes"
      :for="item"
      :key="index"
    >
      <input
        :id="item"
        :value="item"
        :checked="index === 0"
        @input="changeSize($event.target.value)"
        name="size"
        type="radio"
      >
      <span class="size">
        {{ item }}
      </span>
    </label>
    <router-link
      to="#"
      class="size__guide"
    >
      <img src="/img/icons/size.svg" alt="">
      Size guide
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'SelectSize',
    props: {
      sizes: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        size: '',
      };
    },
    methods: {
      changeSize(value) {
        this.size = value;
        this.$emit('model', value);
      },
    },
    mounted() {
      [this.size] = this.sizes;
    },
  };
</script>

<style lang="scss" scoped>
  div {
    font-size: 14px;
  }

  .current-size {
    display: block;
    color: #4f4f4f;
    margin-bottom: 15px;

    b {
      text-transform: uppercase;
    }
  }

  input {
    appearance: none;
  }

  .size {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border: 1px solid #bdbdbd;
    margin-right: 10px;
    color: #bdbdbd;
    text-transform: uppercase;

    &:hover,
    &:focus {
      border-width: 2px;
    }

    &__guide {
      display: flex;
      color: #828282;
      margin-top: 15px;

      img {
        width: 20px;
        margin-right: 10px;
        margin-left: 30px;
      }
    }
  }

  input:checked ~ .size {
    border-width: 2px;
    border-color: #828282;
    color: #828282;
  }
</style>
