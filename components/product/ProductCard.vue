<template>
  <v-card :to="`/product/${item.id}`" class="card">
    <img :src="item.sides[0].small" width="90%" alt="" class="text-center" />
    <p class="subtitle-2">
      {{ item.title }}<br />
      <span class="subtitle-1">{{ item.category.title }}</span>
    </p>
    <p class="font-weight-medium">
      <span v-if="item.old_price !== 0" class="text-decoration-line-through">
        {{ item.old_price }}
      </span>
      <span>{{ item.price }}</span>
    </p>
  </v-card>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    item: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
  height: 100%;
  text-align: center;

  img {
    width: 100%;
  }
}
</style>
