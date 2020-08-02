<template>
  <v-row>
    <v-col cols="5">
      <v-carousel>
        <v-carousel-item
          v-for="(item, i) in slides"
          :key="'slide' + i"
          :src="item.big"
        />
      </v-carousel>
    </v-col>
    <v-col cols="7">
      <h1 class="h1">
        {{ data.design.alias }}
      </h1>
      <p class="subtitle-1">
        {{ data.categories[0].title }}
      </p>
      <span class="product__price">
        {{ product.price }} руб
        <span v-if="product.old_price > 0" class="product__old-price">
          {{ product.old_price }} руб
        </span>
      </span>
      <select-color
        v-if="colors.length > 0"
        :data="colors"
        :res="relations"
        class="product-top__color"
        @model="changeColor($event)"
      />
      <select-size
        v-if="sizes.length > 0"
        :data="sizes"
        :res="relations"
        class="product-top__size"
        @model="changeSize($event)"
      />
      <div class="product__count">
        <v-text-field
          v-model="count"
          type="number"
          placeholder="Количество"
          solo
        />
      </div>
      <div class="my-2">
        <v-btn depressed small color="primary">Добавить в корзину</v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import SelectColor from './SelectColor';
import SelectSize from './SelectSize';

export default {
  name: 'AProductInfo',
  components: { SelectColor, SelectSize },
  props: {
    data: {
      type: Object,
      required: true
    },
    relations: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      color: '',
      colors: [],
      size: '',
      sizes: [],
      slides: [],
      product: [],
      variants: [],
      count: 1
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      if (this.data) {
        // init all variants for this model
        this.variants = this.data.variants;

        // init all colors and sizes
        this.sizes = [];
        this.colors = [];
        for (let i = 0; i < this.variants.length; i++) {
          const { relations } = this.variants[i];
          const types = ['colors', 'sizes'];
          for (let k = 0; k < types.length; k++) {
            if (!this[types[k]].includes(relations[k].id)) {
              // inique values
              this[types[k]].push(relations[k].id);
            }
          }
        }
        [this.color] = this.colors;
        [this.size] = this.sizes;
        this.currentProduct();
      }
    },
    changeColor(value) {
      this.color = value;
      this.currentProduct();
    },
    changeSize(value) {
      this.size = value;
      this.currentProduct();
    },
    currentProduct() {
      this.product = [];
      // init selected product
      [this.product] = this.variants.filter((variant) => {
        if (
          variant.relations[0].id === this.color &&
          variant.relations[1].id === this.size
        ) {
          return variant;
        }
        return false;
      });
      this.slides = this.product.sides; // init photos for this product
    },
    addToCart() {
      const color = document.querySelector('.current-color b').innerHTML;
      const size = document.querySelector('.current-size b').innerHTML;

      const colorAlias = document.querySelector('.current-color-alias').value;
      const sizeAlias = document.querySelector('.current-size-alias').value;

      const selected = {
        id: this.data.id,
        design: Number(this.id),
        sizeName: size,
        colorName: color,
        size: sizeAlias,
        color: colorAlias,
        count: this.count,
        title: this.name,
        model: this.model,
        in_stock: this.product.available,
        photo: this.product.sides[0].small,
        old_price: this.product.old_price,
        price: this.product.price,
        print_type_name: this.product.print_type_name,
        main_side_position: 0,
        product_type: this.data.categories[0].id,
        type: 'catalog'
      };
      this.$store.commit('addToCart', selected);
    }
  }
};
</script>

<style lang="scss" scoped>
.product {
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

  &__count {
    width: 150px;
  }
}
</style>