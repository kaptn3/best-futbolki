<template>
  <div class="container">
    <div>
      <h1 class="text-h4 text-center">
        Best Futbolki - популярные товары
      </h1>
      <div
        v-if="loading"
        class="d-flex justify-center pa-10"
        style="width: 100%;"
      >
        <v-progress-circular :size="50" color="primary" indeterminate />
      </div>
      <v-row>
        <v-col v-for="i in products" :key="i.id" cols="12" sm="6" md="3">
          <ProductCard :item="i" />
        </v-col>
      </v-row>
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
      loading: true
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.loading = true;
      this.$axios('/main.php?offset=0').then((res) => {
        this.products = res.data.items;
        this.loading = false;
      });
    }
  }
};
</script>
