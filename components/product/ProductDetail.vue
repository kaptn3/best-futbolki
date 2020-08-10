<template>
  <v-container class="details" fluid>
    <v-row justify="center">
      <v-col cols="10">
        <v-tabs v-model="tab" background-color="#f2f2f2" color="green darken-1">
          <v-tab>
            Описание
          </v-tab>
          <v-tab>
            Метод печати
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab" style="background-color: #f2f2f2;">
          <v-tab-item key="Описание">
            <div class="my-4">
              <div v-for="(detail, index) in items" :key="'row-1' + index">
                <h3 class="subtitle-1 font-weight-bold">{{ detail.title }}:</h3>
                <span>{{ detail.value }}</span>
              </div>
              <div v-html="moreInfo" />
            </div>
          </v-tab-item>
          <v-tab-item key="Метод печати">
            <div v-if="printType" class="my-4">
              <p>Метод печати: {{ printType.title }}</p>
              <div v-html="printType.text" />
            </div>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'ProductDetail',
  props: {
    details: {
      type: Array,
      default: () => []
    },
    productType: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      tab: 'Описание'
    };
  },
  mounted() {
    this.getMoreInfo(this.productType);
  },
  methods: {
    ...mapActions({
      getMoreInfo: 'product/getMoreInfo'
    })
  },
  computed: {
    ...mapState({
      moreInfo: (state) => state.product.moreInfo,
      printType: (state) => state.product.printType
    }),
    items() {
      return this.details.filter((item) => item.alias !== 'description');
    }
  }
};
</script>

<style lang="scss" scoped>
.details {
  background-color: #f2f2f2;
  color: #4f4f4f;

  h3 {
    display: inline;
  }
}
</style>
