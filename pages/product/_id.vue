<template>
  <div>
    <v-app-bar max-height="64px" flat fixed>
      <v-toolbar-title>Best futbolki</v-toolbar-title>
      <v-spacer />
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main v-if="product">
      <v-container fluid>
        <v-row justify="center">
          <v-col cols="10">
            <a-product-info :data="product" :relations="relations" />
          </v-col>
        </v-row>
      </v-container>
      <product-detail :details="product.external_attributes" />
    </v-main>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import AProductInfo from '~/components/AProductInfo';
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
