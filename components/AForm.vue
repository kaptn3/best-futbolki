<template>
  <v-form @submit="submitForm">
    <v-row>
      <v-col cols="12" md="4" class="form-input">
        <AInput
          label="Фамилия *"
          name="last-name"
          model="lastName"
          :required="false"
        />
      </v-col>
      <v-col cols="12" md="4" class="form-input">
        <AInput label="Имя *" name="first-name" model="firstName" />
      </v-col>
      <v-col cols="12" md="4" class="form-input">
        <AInput label="Отчество *" name="middle-name" model="middleName" />
      </v-col>
      <v-col cols="12" md="6" class="form-input">
        <AInput label="Телефон *" name="phone" model="phone" counter="18" />
      </v-col>
      <v-col cols="12" md="6" class="form-input">
        <AInput label="E-mail *" name="email" model="email" />
      </v-col>
      <v-col cols="12" class="form-input">
        <v-combobox
          v-model="city"
          :items="items"
          :filled="!!city"
          :loading="isLoading"
          :allow-overflow="false"
          :search-input.sync="search"
          :rules="[!!city || 'Необходимо заполнить']"
          hide-no-data
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
      <v-col cols="12" class="form-input">
        <AInput label="Адрес *" name="address" model="address" />
      </v-col>
      <v-col cols="12" class="form-input">
        <h3 class="h3">Способ доставки</h3>
        <v-radio-group v-model="selectDeliveries" column>
          <v-radio
            v-for="item in deliveries"
            :key="item.alias"
            :value="item.alias"
            class="align-start my-2"
            required
          >
            <template v-slot:label>
              <div
                class="d-flex flex-wrap justify-space-between align-center"
                style="width: 100%;"
              >
                <div>
                  <span class="font-weight-bold">{{ item.title }}</span>
                  <span>{{ durationHandle(item.duration.max) }}</span>
                </div>
                <span class="font-weight-medium">
                  {{ deliveryCostHandle(item.cost, item.alias) }} руб.
                </span>
                <div
                  v-if="item.alias === 'merge_postamat_delivery'"
                  class="primary--text"
                  style="width: 100%;"
                  @click="isSelectPoint = true"
                >
                  Выбрать точку
                </div>
              </div>
            </template>
          </v-radio>
        </v-radio-group>
      </v-col>
      <v-col cols="12" class="form-input">
        <h3 class="h3">Способ оплаты</h3>
        <v-radio-group v-model="paymentAlias" column>
          <v-radio
            v-for="item in payments"
            :key="item.alias"
            :value="item.alias"
            :label="item.title"
            class="align-start my-2"
            required
          />
        </v-radio-group>
      </v-col>
    </v-row>
    <v-btn type="submit" depressed color="grey darken-3" dark large block>
      Оформить
    </v-btn>
    <v-dialog v-model="isSelectPoint" max-width="1200" class="overflow-hidden">
      <SelectPoint />
    </v-dialog>
  </v-form>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import AInput from './AInput';
import SelectPoint from './checkout/SelectPoint';

export default {
  name: 'AForm',
  components: {
    AInput,
    SelectPoint
  },
  data() {
    return {
      items: [],
      isLoading: false,
      search: null,
      selectDeliveries: null,
      isSelectPoint: false
    };
  },
  computed: {
    ...mapState({
      stateCity: (state) => state.order.city,
      deliveries: (state) => state.form.deliveries,
      deliveryAlias: (state) => state.order.deliveryAlias,
      pickupDeliveryAlias: (state) => state.order.pickupDeliveryAlias,
      payments: (state) => state.form.payments,
      payment: (state) => state.order.payment
    }),
    city: {
      get() {
        return this.stateCity;
      },
      set(value) {
        this.setRegionInfo(value);
        this.setCity(value ? value.city : value);
      }
    },
    paymentAlias: {
      get() {
        return this.payment;
      },
      set(value) {
        this.setOrderData({
          name: 'payment',
          value
        });
      }
    }
  },
  watch: {
    search(val) {
      this.isLoading = true;

      this.$axios
        .get(`/delivery_suggest.php?text=${this.search}`)
        .then((res) => {
          console.log(res.data);
          this.items = res.data;
        })
        .finally(() => (this.isLoading = false));
    },
    selectDeliveries() {
      this.isSelectPoint =
        this.selectDeliveries === 'merge_postamat_delivery' &&
        this.pickupDeliveryAlias.length === 0;
      this.setOrderData({
        name: 'deliveryAlias',
        value: this.selectDeliveries
      });
    },
    city() {
      this.getDelivery(this.city);
    }
  },
  methods: {
    ...mapMutations({
      setOrderData: 'order/setData',
      setCity: 'order/setCity',
      setRegionInfo: 'order/setRegionInfo'
    }),
    ...mapActions({
      getDelivery: 'form/getDelivery',
      sendForm: 'order/sendForm'
    }),
    alias(alias) {
      if (alias === 'merge_postamat_delivery') {
        return this.deliveryAlias;
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
      this.sendForm(e);
    }
  }
};
</script>

<style lang="scss" scoped>
.v-dialog {
  overflow: hidden;
}

.form-input {
  padding-top: 0;
  padding-bottom: 0;
}
</style>
