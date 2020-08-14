<template>
  <v-app>
    <v-sheet class="overflow-hidden" style="position: relative;">
      <v-app-bar max-height="64px" flat fixed>
        <v-container class="d-flex align-center">
          <v-toolbar-title>Best futbolki</v-toolbar-title>
          <v-spacer />
          <v-btn class="ma-2" text small @click="isChangeCity = true">
            {{ cityForHeader }} <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
          <v-btn icon @click="isCart = !isCart">
            <v-badge
              :value="cartCount"
              :content="cartCount"
              color="grey"
              overlap
            >
              <v-icon>mdi-cart</v-icon>
            </v-badge>
          </v-btn>
        </v-container>
      </v-app-bar>
      <v-navigation-drawer
        v-model="isCart"
        width="770px"
        right
        absolute
        temporary
      >
        <div class="d-flex my-3">
          <v-spacer />
          <v-btn icon @click="isCart = !isCart">
            <v-icon large>mdi-close</v-icon>
          </v-btn>
        </div>
        <CartWrapper />
      </v-navigation-drawer>
      <v-main>
        <v-container fluid>
          <Nuxt />
        </v-container>
      </v-main>
      <v-dialog v-model="isChangeCity" max-width="400">
        <v-card>
          <v-card-title class="headline">
            Поменять город
          </v-card-title>
          <v-card-text>
            <v-btn
              v-for="item in cities"
              :key="`choice-${item.city}`"
              text
              @click="changeCity(item)"
            >
              {{ item.city }}
            </v-btn>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-sheet>
  </v-app>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import CartWrapper from '~/components/cart/CartWrapper';

export default {
  components: {
    CartWrapper
  },
  data() {
    return {
      isCart: false,
      isChangeCity: false
    };
  },
  computed: {
    ...mapState({
      cartCount: (state) => state.cart.cartCount,
      city: (state) => state.order.city,
      cities: (state) => state.user.cities,
      ipCity: (state) => state.order.ipCity
    }),
    cityForHeader() {
      return this.city || this.ipCity;
    }
  },
  mounted() {
    this.getCity();
    this.getCities();
  },
  methods: {
    ...mapActions({
      getCity: 'order/getCity',
      getCities: 'user/getCities'
    }),
    ...mapMutations({
      setCity: 'order/setCity',
      setRegionInfo: 'order/setRegionInfo'
    }),
    changeCity(item) {
      this.setCity(item.city);
      this.setRegionInfo(item);
      this.isChangeCity = false;
    }
  }
};
</script>

<style lang="scss">
html,
.hidden {
  overflow: auto !important;
}

main {
  margin-top: 64px;
}

.table {
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 1rem;
  color: #212529;
}

.table thead th {
  vertical-align: bottom;
  border-bottom: 2px solid #dee2e6;
  text-align: inherit;
}

.table td,
.table th {
  padding: 0.2rem;
  vertical-align: top;
  border: 1px solid #dee2e6;
}

.table-bordered {
  border: 1px solid #dee2e6;
}

.size-table {
  p {
    text-align: center;
  }

  img {
    height: auto;
  }
}
</style>
