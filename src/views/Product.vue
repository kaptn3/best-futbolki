<template>
  <div>
    <loading v-if="loading"/>
    <div :class="{ 'product_loading': loading }">
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
        v-if="!error"
        :details="details"
      />
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import ProductTop from '@/components/product/ProductTop';
  import ProductDetail from '@/components/product/ProductDetail';
  import Loading from '@/components/Loading';

  export default {
    components: {
      ProductTop,
      ProductDetail,
      Loading
    },
    data() {
      return {
        data: {},
        relations: {},
        id: 0,
        name: '',
        model: '',
        details: [],
        error: '',
        loading: true
      };
    },
    watch: {
      // eslint-disable-next-line
      '$route.params'() {
        this.handleGet();
        this.$store.commit('toggleModal', null);
      }
    },
    mounted() {
      this.handleGet();
    },
    methods: {
      handleGet() {
        this.loading = true;
        const productId = this.$route.params.id; // product id for get API
        const url = `${process.env.VUE_APP_API}/test_api.php/?i=${productId}`;
        const urlRef = `${process.env.VUE_APP_API}/catalog_references.php`;

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
            this.loading = false;
          })
          .catch(() => {
            this.loading = false;
            this.error = 'Товар не найден!';
          });
      }
    },
  };
</script>

<style lang="scss" scoped>
  .product_loading {
    visibility: hidden;
  }

  .product__error {
    text-align: center;
    margin-top: 50px;
    font-size: 26px;
  }
</style>
