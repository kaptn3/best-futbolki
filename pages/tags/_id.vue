<template>
  <div>
    <ProductList
      v-if="tags.length > 0"
      :link="link"
      :text="text[0].title"
      pagination
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ProductList from '~/components/product/ProductList';

export default {
  components: { ProductList },
  layout: 'catalog',
  computed: {
    ...mapState({
      tags: (state) => state.catalog.tags
    }),
    link() {
      return `/catalog_tags.php?tag=${this.$route.params.id}&`;
    },
    text() {
      const item = this.tags.filter((i) => i.id === this.$route.params.id);
      return item;
    }
  }
};
</script>
