<template>
  <v-form @submit="submitForm">
    <v-row>
      <v-col cols="12" md="4">
        <v-text-field
          v-model="form.lastName"
          :filled="form.lastName.length > 0"
          label="Фамилия *"
          name="last-name"
          hide-details
          required
        />
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          v-model="form.firstName"
          :filled="form.firstName.length > 0"
          label="Имя *"
          name="first-name"
          hide-details
          required
        />
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          v-model="form.middleName"
          :filled="form.middleName.length > 0"
          label="Отчество *"
          name="middle-name"
          hide-details
          required
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="form.phone"
          :filled="form.phone.length > 0"
          label="Телефон *"
          name="phone"
          hide-details
          required
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="form.email"
          :filled="form.email.length > 0"
          label="E-mail *"
          name="email"
          hide-details
          required
        />
      </v-col>
      <v-col cols="12">
        <v-combobox
          v-model="city"
          :items="items"
          :filled="!!city"
          :loading="isLoading"
          :allow-overflow="false"
          :search-input.sync="search"
          hide-no-data
          hide-details
          item-text="city"
          label="Город *"
          name="city"
          return-object
          autocomplete="off"
          no-filter
        >
          <template v-slot:item="data">
            <span v-if="data.item.region">{{ data.item.region }}, </span>
            {{ data.item.city }}
          </template>
        </v-combobox>
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="form.address"
          :filled="form.address.length > 0"
          label="Адрес *"
          name="address"
          hide-details
          required
        />
      </v-col>
      <v-col>
        <h3 class="h3">Способ доставки</h3>
        <v-radio-group v-model="ex7" column>
          <v-radio
            v-for="item in deliveries"
            :key="item.alias"
            :value="alias(item.alias)"
            required
          >
            <template v-slot:label>
              <div
                class="d-flex justify-space-between align-center"
                style="width: 100%;"
              >
                <div>
                  <span class="font-weight-bold">{{ item.title }}</span>
                  <span>{{ durationHandle(item.duration.max) }}</span>
                </div>
                <span class="font-weight-medium">
                  {{ deliveryCostHandle(item.cost, item.alias) }} руб.
                </span>
              </div>
            </template>
          </v-radio>
        </v-radio-group>
      </v-col>
    </v-row>
    <v-btn type="submit" depressed color="grey darken-3" dark large block>
      Оформить
    </v-btn>
  </v-form>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'AForm',
  data() {
    return {
      items: [],
      isLoading: false,
      search: null,
      form: {
        lastName: '',
        middleName: '',
        firstName: '',
        phone: '',
        email: '',
        address: ''
      },
      city: null,
      ex7: null
    };
  },
  computed: {
    ...mapState({
      stateCity: (state) => state.user.city,
      deliveries: (state) => state.form.deliveries
    })
  },
  mounted() {
    this.city = this.stateCity;
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
    city() {
      this.getDelivery(this.city);
    }
  },
  methods: {
    ...mapActions({
      getDelivery: 'form/getDelivery'
    }),
    alias(alias) {
      if (alias === 'merge_postamat_delivery') {
        return 'this.$store.state.deliveryAlias';
      }
      return alias;
    },
    durationHandle(duration) {
      let res = `от ${duration} `;
      if (duration === 0 || duration > 1) {
        res += 'дней';
      } else {
        res += 'дня';
      }
      return res;
    },
    deliveryCostHandle(cost, alias) {
      if (alias === 'merge_postamat_delivery') {
        if (this.$store.state.pointCost > 0) {
          return this.$store.state.pointCost;
        }
        return `от ${cost}`;
      }
      return cost;
    },
    submitForm(e) {
      e.preventDefault();
      // const formData = new FormData();
      const receiver = {};
      const address = {
        id: 0,
        country: 'Россия',
        region: '',
        region_type: '',
        postcode: '0'
      };
      address.city = this.city.city ? this.city.city : this.city;

      receiver.address = address;
      receiver['last-name'] = this.form.lastName;
      receiver['first-name'] = this.form.firstName;
      receiver['middle-name'] = this.form.middleName;
      receiver.phone = this.form.phone;
      receiver.email = this.form.email;
      receiver.comment = '';
      receiver.name = `${this.form.lastName} ${this.form.firstName} ${this.form.middleName}`;

      const data = {};
      data.receiver = receiver;
      data.delivery = 'EMSPOST_50_Parcel_IP_201612';
      data.payment_alias = 'POSTAL';
      data.pickup_point_id = '0';
      data.promo_code = '';
      // Object.assign(data, { cart: this.$store.state.cart });
      console.log(data);
      // const url = 'http://api.best-futbolki.ru/API/order.php';
      /* this.$axios.post(url, data).then((res) => {
        console.log(res);
        this.status = 'ok';
        this.id = res.data.id;
        this.$store.state.cart = [];
        this.$store.state.cartCount = 0;
        window.localStorage.removeItem('cart');
        window.localStorage.removeItem('cartCount');
      }); */
    }
  }
};
</script>
