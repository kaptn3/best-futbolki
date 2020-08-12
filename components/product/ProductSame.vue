<template>
  <v-col cols="10">
    <h3 class="h3 text-center">Другие товары:</h3>
    <v-row>
      <v-col
        v-for="item in same"
        :key="'item-' + item.id"
        cols="3"
        class="text-center"
      >
        <v-card :to="`/product/${item.id}`" class="card">
          <img
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
            <span
              v-if="item.old_price !== 0"
              class="text-decoration-line-through"
              >{{ item.old_price }}</span
            >
            <span>{{ item.price }}</span>
          </p>
        </v-card>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'ProductSame',
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapState({
      same: (state) => state.product.same
    })
  },
  mounted() {
    this.getSame(this.id);
  },
  methods: {
    ...mapActions({
      getSame: 'product/getSame'
    })
  }
};
</script>

<style lang="scss" scoped>
.card {
  padding-bottom: 8px;
}
</style>
