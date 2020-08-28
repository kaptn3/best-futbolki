<template>
  <v-row v-if="product" justify="center">
    <v-col cols="12" sm="10">
      <AProductInfo :data="product" :relations="relations" />
    </v-col>
    <ProductDetail
      :details="product.external_attributes"
      :product-type="product.categories[0].id"
    />
    <ProductSame :id="product.design.id" />
  </v-row>
</template>

<script>
import { mapState } from 'vuex';
import ProductSame from '~/components/product/ProductSame';
import AProductInfo from '~/components/product/AProductInfo';
import ProductDetail from '~/components/product/ProductDetail';

export default {
  async middleware({ params, store }) {
    await store.dispatch('product/getProduct', params.id);
  },
  components: { AProductInfo, ProductDetail, ProductSame },
  computed: {
    ...mapState({
      product: (state) => state.product.product,
      relations: (state) => state.product.catalogReferences
    })
  }
};
</script>

<style>
.VueCarousel-slide {
  padding-bottom: 20px;
  padding-top: 20px;
}

@media screen and (max-width: 768px) {
  .VueCarousel-navigation-next {
    transform: translateY(-50%) translateX(0) !important;
  }

  .VueCarousel-navigation-prev {
    transform: translateY(-50%) translateX(0%) !important;
  }
}
</style>
