<template>
  <div class="product-list">
    <h1 class="text-h4 text-center mb-4">Best Futbolki - {{ text }}</h1>
    <v-row class="products-list">
      <v-col v-for="i in products" :key="i.id" cols="12" sm="6" md="4" lg="3">
        <ProductCard :item="i" slides />
      </v-col>
    </v-row>
    <div
      v-if="loading"
      class="d-flex justify-center pa-10"
      style="width: 100%;"
    >
      <v-progress-circular :size="50" color="primary" indeterminate />
    </div>
    <div v-if="(pagination || length > 1) && !loading" class="text-right">
      <v-pagination v-model="page" :length="length" :total-visible="5" />
    </div>
    <div v-if="products.length === 0 && !loading">
      <p>
        Нет товаров!
      </p>
    </div>
  </div>
</template>

<script>
import ProductCard from '~/components/product/ProductCard';

export default {
  name: 'ProductList',
  components: { ProductCard },
  props: {
    link: {
      type: String,
      required: true
    },
    text: {
      type: String,
      default: 'популярные товары'
    },
    pagination: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      products: [],
      loading: false,
      page: 1,
      length: 0
    };
  },
  computed: {
    offset() {
      return this.products.length;
    },
    end() {
      return this.products.length > 100;
    }
  },
  watch: {
    page() {
      this.getData();
    }
  },
  mounted() {
    this.getData();
    if (!this.pagination) {
      window.addEventListener('scroll', this.scrollAction);
    }
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollAction);
    this.products = [];
    this.page = 1;
  },
  methods: {
    getData() {
      if (!this.loading) {
        this.loading = true;
        if (this.pagination) {
          this.products = [];
        }
        const offset = this.pagination ? (this.page - 1) * 36 : this.offset;
        this.$axios.get(`${this.link}offset=${offset}`).then((res) => {
          if (this.products.length === 0 || this.pagination) {
            this.products = res.data.items;
          } else if (res.data.items) {
            this.products = this.products.concat(res.data.items);
          }
          if (this.pagination) {
            this.length = parseInt(res.data.total_items / res.data.limit);
          }
          this.loading = false;
        });
      }
    },
    scrollAction() {
      const t = this;
      const listHeight = document.querySelector('.products-list').clientHeight;
      const card = document.querySelector('.products-list .card');
      if (card) {
        const cardHeight = document.querySelector('.products-list .card')
          .clientHeight;
        const scroll = window.pageYOffset;
        if (
          listHeight - cardHeight * 2 < scroll &&
          !this.loading &&
          !this.end
        ) {
          t.getData();
        }
      }
    }
  }
};
</script>

<style lang="scss">
.product-list .v-pagination {
  justify-content: flex-end;
}
</style>
