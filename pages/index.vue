<template>
  <div>
    <ProductList link="/main.php?" />
  </div>
</template>

<script>
import ProductList from '~/components/product/ProductList';

export default {
  components: { ProductList },
  layout: 'catalog'
};
</script>
