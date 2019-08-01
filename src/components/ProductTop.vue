<template>
  <div class="product-top">
    <div class="container">
      <div class="product-top__side product-top__left">
        <carousel :slides="slides"/>
      </div>
      <div class="product-top__side product-top__right">
        <bread-crumbs/>
        <h1>{{ name }}</h1>
        <span class="product-top__model">model</span>
        <span class="product-top__price">
          {{ price }}
        </span>
        <select-color
          :colors="colors"
          @model="changeColor($event)"
          class="product-top__color"
        />
        <select-size
          :sizes="sizes"
          @model="changeSize($event)"
          class="product-top__size"
        />
        <quantity/>
        <a-button
          class="product-top__btn"
          text="Add to cart"
        />
        <add-to class="product-top__add-to"/>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import Carousel from './product/Carousel.vue';
  import BreadCrumbs from './BreadCrumbs.vue';
  import SelectColor from './SelectColor.vue';
  import SelectSize from './SelectSize.vue';
  import Quantity from './Quantity.vue';
  import AButton from './Button.vue';
  import AddTo from './AddTo.vue';

  export default {
    name: 'ProductTop',
    components: {
      Carousel,
      BreadCrumbs,
      SelectColor,
      SelectSize,
      Quantity,
      AButton,
      AddTo,
    },
    data() {
      return {
        color: '',
        colors: [],
        size: '',
        sizes: [],
        slides: [],
        price: 0,
        name: '',
        product: [],
        variants: [],
      };
    },
    mounted() {
      this.slides = [{ big: '/' }]; // fix error with empty array
      axios.get(process.env.VUE_APP_API)
        .then((response) => {
          // init all variants for this model
          this.variants = response.data.variants;
          this.name = response.data.categories[0].title;

          // init all colors and sizes
          for (let i = 0; i < this.variants.length; i++) {
            const { relations } = this.variants[i];
            if (this.colors.indexOf(relations[0].id) === -1) { // inique values
              this.colors.push(relations[0].id);
            }
            if (this.sizes.indexOf(relations[1].id) === -1) {
              this.sizes.push(relations[1].id);
            }
          }

          [this.color] = this.colors;
          [this.size] = this.sizes;
          this.currentProduct();
        }, (error) => {
          console.log(error);
        });
    },
    methods: {
      changeColor(value) {
        this.color = value;
        this.currentProduct();
      },
      changeSize(value) {
        this.size = value;
        this.currentProduct();
      },
      currentProduct() {
        // init selected product
        this.product = this.variants.filter((variant) => {
          if (variant.relations[0].id === this.color && variant.relations[1].id === this.size) {
            return variant;
          }
          return false;
        });
        this.slides = this.product[0].sides; // init photos for this product
        this.price = this.product[0].price;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .product-top {
    background-color: #fff;
    padding-top: 20px;

    &__side {
      width: 100%;
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

    &__color,
    &__size,
    &__btn,
    &__add-to {
      margin-bottom: 40px;
    }

    &__btn {
      margin-top: 35px;
    }
  }

  .container {
    display: flex;
  }

  h1 {
    font-size: 3rem;
    margin: 20px 0;
  }

  @media screen and (max-width: 767px) {
    .container {
      display: block;
    }

    .product-top {
      &__side {
        margin-bottom: 30px;
      }
    }
  }
</style>
