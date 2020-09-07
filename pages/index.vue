<template>
  <div class="container">
    <div>
      <h1 class="text-h4 text-center mb-4">
        Best Futbolki - популярные товары
      </h1>
      <v-row class="products-list">
        <v-col v-for="i in products" :key="i.id" cols="12" sm="6" md="3">
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
    </div>
  </div>
</template>

<script>
import ProductCard from '~/components/product/ProductCard';

export default {
  components: { ProductCard },
  data() {
    return {
      products: [],
      loading: false
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
  mounted() {
    this.getData();
    const t = this;
    window.addEventListener('scroll', () => {
      const listHeight = document.querySelector('.products-list').clientHeight;
      const cardHeight = document.querySelector('.products-list .card')
        .clientHeight;
      const scroll = window.pageYOffset;
      if (listHeight - cardHeight * 2 < scroll && !this.loading && !this.end) {
        t.getData();
      }
    });
  },
  methods: {
    getData() {
      if (!this.loading) {
        this.loading = true;
        this.$axios.get(`/main.php?offset=${this.offset}`).then((res) => {
          if (this.products.length === 0) {
            this.products = res.data.items;
          } else if (res.data.items) {
            this.products = this.products.concat(res.data.items);
          }
          this.loading = false;
        });
      }
    }
  }
};
</script>
