<template>
  <v-main v-if="product">
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" sm="10">
          <AProductInfo :data="product" :relations="relations" />
        </v-col>
      </v-row>
    </v-container>
    <ProductDetail
      :details="product.external_attributes"
      :product-type="product.categories[0].id"
    />
  </v-main>
</template>

<script>
import { mapState } from 'vuex';
import AProductInfo from '~/components/product/AProductInfo';
import ProductDetail from '~/components/product/ProductDetail';

export default {
  async middleware({ params, store }) {
    await store.dispatch('product/getProduct', params.id);
  },
  components: { AProductInfo, ProductDetail },
  computed: {
    ...mapState({
      product: (state) => state.product.product,
      relations: (state) => state.product.catalogReferences
    })
  }
};
</script>

<style scoped>
main {
  margin-top: 64px;
}
</style>
