<template>
  <v-col cols="12" sm="10" class="product-same">
    <h3 class="h3 text-center">Другие товары:</h3>
    <v-tabs v-model="tabs" color="green darken-1" class="tabs" grow>
      <v-tab v-for="(item, index) in cats" :key="index">
        {{ index }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tabs" touchless>
      <v-tab-item v-for="(item, index) in cats" :key="index">
        <Carousel
          :min-swipe-distance="16"
          :per-page-custom="[
            [0, 1],
            [500, 2],
            [768, 3],
            [1024, 4]
          ]"
          :pagination-enabled="false"
          navigation-enabled
        >
          <Slide v-for="i in item" :key="'item-' + i.id">
            <v-card :to="`/product/${i.id}`" class="card">
              <img
                :src="i.sides[0].small"
                width="90%"
                alt=""
                class="text-center"
              />
              <p class="subtitle-2">
                {{ i.title }}<br />
                <span class="subtitle-1">{{ i.category.title }}</span>
              </p>
              <p class="font-weight-medium">
                <span
                  v-if="i.old_price !== 0"
                  class="text-decoration-line-through"
                  >{{ i.old_price }}</span
                >
                <span>{{ i.price }}</span>
              </p>
            </v-card>
          </Slide>
        </Carousel>
      </v-tab-item>
    </v-tabs-items>
  </v-col>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { Carousel, Slide } from 'vue-carousel';

export default {
  name: 'ProductSame',
  components: { Carousel, Slide },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      tabs: ''
    };
  },
  computed: {
    ...mapState({
      same: (state) => state.product.same,
      structure: (state) => state.product.structure
    }),
    cats() {
      if (this.structure.length > 0 && this.same.length > 0) {
        const cats = {};
        for (let i = 0; i < this.same.length; i++) {
          const cat = this.same[i].category.id;
          const firstLevel = this.structure.filter((item) => item.id === cat);
          const secondLevel = this.structure.filter(
            (item) => item.id === firstLevel[0].parent
          );
          const thirdLevel = this.structure.filter(
            (item) => item.id === secondLevel[0].parent
          );
          const title = thirdLevel[0].title;
          if (cats[title]) {
            cats[title].push(this.same[i]);
          } else {
            cats[title] = [];
          }
        }
        return cats;
      }
      return {};
    }
  },
  mounted() {
    this.getSame(this.id);
    this.getStructure();
  },
  methods: {
    ...mapActions({
      getSame: 'product/getSame',
      getStructure: 'product/getStructure'
    })
  }
};
</script>

<style lang="scss" scoped>
.card {
  padding: 20px;
  margin: 0 15px 40px 15px;
}
</style>
