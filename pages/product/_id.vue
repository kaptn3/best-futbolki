<template>
  <div>
    <product-top
      v-if="!error"
      :id="id"
      :data="data"
      :name="name"
      :model="model"
      :relations="relations"
    />
    <div
      v-if="error"
      class="product__error"
    >
      <h1>{{ error }}</h1>
    </div>
    <product-detail
      v-if="!error && details"
      :details="details"
    />
  </div>
</template>

<script>
  import axios from 'axios';
  import ProductTop from '~/components/product/ProductTop';
  import ProductDetail from '~/components/product/ProductDetail';

  export default {
    components: {
      ProductTop,
      ProductDetail
    },
    data() {
      return {
        data: {},
        relations: {},
        id: 0,
        name: '',
        model: '',
        details: [],
        error: ''
      };
    },
    mounted() {
      const productId = this.$route.params.id; // product id for get API
      const url = `${this.$store.state.api.url}/test_api.php/?i=${productId}`;
      const urlRef = `${this.$store.state.api.url}/catalog_references.php`;

      axios.get(url)
        .then((res) => {
          this.data = res.data;
          this.id = this.data.design.id;
          this.name = this.data.design.alias;
          this.model = this.data.categories[0].title;
          this.details = this.data.external_attributes;

          return axios.get(urlRef);
        })
        .then((res) => {
          this.relations = res.data;
        })
        .catch(() => {
          this.error = 'Товар не найден!';
        });
    }
  };
</script>

<style lang="scss" scoped>
  .product__error {
    text-align: center;
    margin-top: 50px;
    font-size: 26px;
  }
</style>
