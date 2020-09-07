<template>
  <v-card :to="`/product/${item.id}`" class="card">
    <div v-if="slides">
      <v-carousel
        v-model="current"
        height="300"
        :show-arrows="false"
        hide-delimiters
      >
        <v-carousel-item
          v-for="(k, i) in item.sides"
          :key="'slide' + i"
          :src="k.small"
          class="a-carousel"
        />
        <div class="d-flex card__slides-over">
          <div
            v-for="(m, index) in item.sides"
            :key="index"
            :style="`width: ${100 / item.sides.length}%; height: 100%;`"
            @mouseover="current = index"
          />
        </div>
      </v-carousel>
    </div>
    <img
      v-else
      :src="item.sides[0].small"
      width="90%"
      alt=""
      class="text-center"
    />
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
    },
    slides: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      current: 0
    };
  }
};
</script>

<style lang="scss">
.card {
  height: 100%;
  text-align: center;

  img {
    width: 100%;
  }

  &__slides-over {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 9;
  }
}
</style>
