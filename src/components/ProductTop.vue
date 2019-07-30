<template>
  <div class="product-top">
    <div class="container">
      <div class="product-top__side product-top__left">
        Slider
      </div>
      <div class="product-top__side product-top__right">
        <bread-crumbs/>
        <h1>Product Name</h1>
        <span class="product-top__model">model</span>
        <span class="product-top__price">2500</span>
        <select-color
          :colors="colors"
          @model="changeColor($event)"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import BreadCrumbs from './BreadCrumbs.vue';
  import SelectColor from './SelectColor.vue';

  export default {
    name: 'ProductTop',
    components: {
      BreadCrumbs,
      SelectColor,
    },
    data() {
      return {
        color: '',
        colors: [
          'blue',
          'orange',
          'purple',
        ],
      };
    },
    methods: {
      changeColor(value) {
        this.color = value;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .product-top {
    background-color: #f2f2f2;
    padding-top: 20px;

    &__side {
      width: 50%;
      padding: 0 15px;
      flex-shrink: 1;
    }

    &__model {
      color: #828282;
      display: block;
      margin-bottom: 20px;
    }

    &__price {
      margin-bottom: 40px;
      font-size: 36px;
      display: block;
    }
  }

  .container {
    display: flex;
  }

  h1 {
    font-size: 3rem;
    margin: 20px 0;
  }
</style>
