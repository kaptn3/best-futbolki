<template>
  <div>
    <ProductList :link="link" />
  </div>
</template>

<script>
import ProductList from '~/components/product/ProductList';

export default {
  components: { ProductList },
  layout: 'catalog',
  computed: {
    link() {
      return `catalog_tags.php/?tag=${this.$route.params.id}&`;
    }
  }
};
</script>
