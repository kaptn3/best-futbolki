<template>
  <div class="product-top">
    <div class="container product-top__box">
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
          {{ product.price }} руб
          <span class="product-top__old-price">
            {{ product.old_price }} руб
          </span>
        </span>
        <select-color
          :data="colors"
          :res="res"
          class="product-top__color"
          @model="changeColor($event)"
        />
        <select-size
          :data="sizes"
          :res="res"
          class="product-top__size"
          @model="changeSize($event)"
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
    <product-detail
      :details="details"
      :data-loaded="details.length > 0"
    />
  </div>
</template>

<script>
  import axios from 'axios';
  import Carousel from './Carousel';
  import BreadCrumbs from './BreadCrumbs';
  import SelectColor from '../SelectColor';
  import SelectSize from '../SelectSize';
  import Quantity from './Quantity';
  import AButton from '../Button';
  import AddTo from './AddTo';
  import ProductDetail from './ProductDetail';

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
      ProductDetail
    },
    data() {
      return {
        color: '',
        colors: [],
        size: '',
        sizes: [],
        slides: [],
        name: '',
        model: '',
        product: [],
        variants: [],
        res: {},
        quantity: 1,
        id: 0,
        details: []
      };
    },
    mounted() {
      this.slides = [{ big: '/' }]; // fix error with empty array
      const url = `${process.env.VUE_APP_API}/data.json`;
      const urlRef = `${process.env.VUE_APP_API}/reference.json`;
      axios.get(url)
        .then((res) => {
          // init all variants for this model
          this.id = res.data.design.id;
          this.variants = res.data.variants;
          this.name = res.data.design.alias;
          this.model = res.data.categories[0].title;
          this.details = res.data.external_attributes;

          // init all colors and sizes
          for (let i = 0; i < this.variants.length; i++) {
            const { relations } = this.variants[i];
            const types = ['colors', 'sizes'];
            for (let k = 0; k < types.length; k++) {
              if (this[types[k]].indexOf(relations[k].id) === -1) { // inique values
                this[types[k]].push(relations[k].id);
              }
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
      },
      addToCart() {
        const color = document.querySelector('.current-color b').innerHTML;
        const size = document.querySelector('.current-size b').innerHTML;
        const selected = {
          'id': this.id,
          'sizeName': size,
          'colorName': color,
          'quantity': this.quantity,
          'title': this.name,
          'model': this.model,
          'available': this.product.available,
          'photo': this.product.sides[0].small,
          'old_price': this.product.old_price,
          'price': this.product.price,
          'print_type_name': this.product.print_type_name
        };
        this.$store.commit('addToCart', selected);
      }
    },
  };
</script>

<style lang="scss" scoped>
  .product-top {
    background-color: #fff;
    padding-top: 20px;

    &__box {
      display: flex;
    }

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
