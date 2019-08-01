<template>
  <div class="product-top">
    <div class="container">
      <div class="product-top__side product-top__left">
        <carousel :slides="slides"/>
      </div>
      <div class="product-top__side product-top__right">
        <bread-crumbs/>
        <h1>{{ name }}</h1>
        <span class="product-top__model">
          {{ model }}
        </span>
        <span class="product-top__price">
          {{ price }}
          <span class="product-top__old-price">
            {{ old_price }}
          </span>
        </span>
        <select-color
          :data="colors"
          :res="res"
          @model="changeColor($event)"
          class="product-top__color"
        />
        <select-size
          :data="sizes"
          :res="res"
          @model="changeSize($event)"
          class="product-top__size"
        />
        <quantity v-model="quantity"/>
        <a-button
          class="product-top__btn"
          text="Add to cart"
          @click="addToCart"
        />
        <add-to class="product-top__add-to"/>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import Carousel from './Carousel.vue';
  import BreadCrumbs from './BreadCrumbs.vue';
  import SelectColor from '../SelectColor.vue';
  import SelectSize from '../SelectSize.vue';
  import Quantity from './Quantity.vue';
  import AButton from '../Button.vue';
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
        old_price: 0,
        name: '',
        model: '',
        product: [],
        variants: [],
        res: {},
        quantity: 1,
      };
    },
    mounted() {
      this.slides = [{ big: '/' }]; // fix error with empty array
      const url = `${process.env.VUE_APP_API}/data.json`;
      const urlRef = `${process.env.VUE_APP_API}/reference.json`;
      axios.get(url)
        .then((res) => {
          // init all variants for this model
          this.variants = res.data.variants;
          this.name = res.data.design.alias;
          this.model = res.data.categories[0].title;

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

          // get colors and sizes data
          return axios.get(urlRef);
        })
        .then((res) => {
          this.res = res.data;
        })
        .catch((error) => {
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
        [this.product] = this.variants.filter((variant) => {
          if (variant.relations[0].id === this.color && variant.relations[1].id === this.size) {
            return variant;
          }
          return false;
        });
        this.slides = this.product.sides; // init photos for this product
        this.price = `${this.product.price} руб`;
        this.old_price = `${this.product.old_price} руб`;
      },
      addToCart() {
        const selected = {
          title: this.title,
          model: this.model,
          price: this.price,
          size: this.size,
          color: this.color,
          quantity: this.quantity,
          photo: this.product.sides,
        };

        this.$store.commit('addToCart', selected);

        // const selectedJson = JSON.stringify(selected);

        // localStorage.setItem('cart', selected);
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

    &__old-price {
      color: #828282;
      font-size: 18px;
      margin-bottom: 10px;
      display: inline-block;
      vertical-align: bottom;
      text-decoration: line-through;
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
