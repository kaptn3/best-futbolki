<template>
  <v-app>
    <v-sheet class="overflow-hidden" style="position: relative;">
      <v-app-bar max-height="64px" flat fixed>
        <v-container class="d-flex align-center">
          <v-toolbar-title>
            <v-btn to="/" text>
              Best futbolki
            </v-btn>
          </v-toolbar-title>
          <v-spacer />
          <v-btn class="ma-2" text small @click="isChangeCity = true">
            {{ cityForHeader }} <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
          <v-btn icon @click="isCart = !isCart">
            <v-badge
              :value="productCount"
              :content="productCount"
              color="grey"
              overlap
            >
              <v-icon>mdi-cart</v-icon>
            </v-badge>
          </v-btn>
        </v-container>
      </v-app-bar>
      <v-navigation-drawer v-model="isCart" width="770px" right temporary app>
        <div class="d-flex my-3">
          <v-spacer />
          <v-btn icon @click="isCart = !isCart">
            <v-icon small>mdi-close</v-icon>
          </v-btn>
        </div>
        <Cart />
      </v-navigation-drawer>
      <slot />
      <v-dialog v-model="isChangeCity" max-width="640">
        <v-card>
          <v-card-title class="headline">
            Поменять город
          </v-card-title>
          <v-card-text>
            <v-combobox
              v-model="citySearched"
              :items="items"
              :loading="isLoading"
              :allow-overflow="false"
              :search-input.sync="search"
              hide-no-data
              item-text="city"
              label="Поиск"
              return-object
              no-filter
            >
              <template v-slot:item="data">
                <span v-if="data.item.region">{{ data.item.region }}, </span>
                {{ data.item.city }}
              </template>
            </v-combobox>
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
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex';
import Cart from '~/components/cart/Cart';

export default {
  name: 'Layout',
  components: {
    Cart
  },
  data() {
    return {
      isCart: false,
      isChangeCity: false,
      citySearched: '',
      items: [],
      isLoading: false,
      search: ''
    };
  },
  computed: {
    ...mapState({
      city: (state) => state.order.city,
      cities: (state) => state.user.cities,
      ipCity: (state) => state.order.ipCity
    }),
    ...mapGetters({
      productCount: 'cart/productCount'
    }),
    cityForHeader() {
      return this.city || this.ipCity;
    }
  },
  watch: {
    search(val) {
      this.isLoading = true;

      this.$axios
        .get(`/delivery_suggest.php?text=${this.search}`)
        .then((res) => {
          this.items = res.data;
        })
        .finally(() => (this.isLoading = false));
    },
    citySearched(val) {
      this.changeCity(val);
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
      this.setCity({ data: item.city });
      this.setRegionInfo(item);
      this.isChangeCity = false;
    }
  }
};
</script>

<style lang="scss">
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
