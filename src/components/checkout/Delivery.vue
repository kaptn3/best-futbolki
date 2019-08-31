<template>
  <div
    v-if="city"
    class="delivery"
  >
    <loading
      v-if="isLoading"
    />
    <h3>Способ доставки</h3>
    <div
      v-for="(delivery, index) in deliveries"
      :key="index"
      class="delivery__item"
    >
      <label
        :class="alias(delivery.alias)"
        class="delivery__label"
      >
        <div>
          <input
            v-model="type"
            type="radio"
            name="delivery"
            :value="alias(delivery.alias)"
            required
          >
          <span class="delivery__name">{{ delivery.title }}</span>
          <span class="delivery__duration">{{ durationHandle(delivery.duration.max) }}</span>
        </div>
        <span>
          <span class="delivery__cost">
            {{ deliveryCostHandle(delivery.cost, delivery.alias) }}
          </span>
          руб.
        </span>
      </label>
      <input
        v-model="$store.state.pointIdDelivery"
        name="pickup_point_id"
        type="text"
        hidden
      >
      <span
        v-if="delivery.alias === 'merge_postamat_delivery'"
        class="delivery__point-address"
      >
        {{ pointAddress }}
      </span>
      <button
        v-if="delivery.alias === 'merge_postamat_delivery'"
        class="delivery__select"
        type="button"
        @click="togglePoints"
      >
        {{ pointMessage }}
      </button>
    </div>
    <select-point
      v-if="isOpenModal && points"
      :points="points"
    >
      <button
        class="map-modal__close-btn"
        @click="togglePoints"
      />
    </select-point>
    <payments :payments="payments"/>
  </div>
</template>

<script>
  import axios from 'axios';
  import SelectPoint from './SelectPoint';
  import Payments from './Payments';
  import Loading from '../Loading';

  export default {
    name: 'Delivery',
    components: {
      SelectPoint,
      Payments,
      Loading
    },
    data() {
      return {
        deliveries: [],
        points: [],
        type: 0,
        group: [],
        isOpenModal: false,
        payments: [],
        isLoading: true,
        cost: 0,
        pointMessage: 'Выбрать пункт выдачи'
      };
    },
    computed: {
      city() {
        return this.$store.state.cityDelivery;
      },
      pointAddress() {
        return this.$store.state.pointAddress;
      }
    },
    watch: {
      city() {
        this.getData();
      },
      type() {
        if (this.type) {
          this.$store.state.deliveryCost = document.querySelector(`.${this.type}`).querySelector('.delivery__cost').innerHTML;
        }
        this.$store.state.deliveryType = this.type;
      },
      pointAddress() {
        this.pointMessage = 'Изменить пункт выдачи';
      }
    },
    mounted() {
      const obj = JSON.parse(window.localStorage.getItem('form'));
      if (obj && obj.city) {
        this.$store.state.cityDelivery = obj.city;
      }
    },
    methods: {
      togglePoints() {
        this.isOpenModal = !this.isOpenModal;
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
      durationHandle(duration) {
        let res = `от ${duration} `;
        if (duration === 0 || duration > 1) {
          res += 'дней';
        } else {
          res += 'дня';
        }
        return res;
      },
      alias(alias) {
        if (alias === 'merge_postamat_delivery') {
          return this.$store.state.deliveryAlias;
        }
        return alias;
      },
      getData() {
        this.isLoading = true;
        const body = {
          user_id: 0,
          cart: [],
          address: {
            id: 0,
            country: 'Россия',
            region: '',
            region_type: '',
            city: this.city,
            address: 'string',
            postcode: '0'
          },
          is_merge_pickup_points: true
        };
        const url = `${process.env.VUE_APP_API}/delivery.php`;
        const options = {
          method: 'POST',
          url,
          header: {
            'Content-type': 'application/json; charset=UTF-8'
          },
          crossDomain: true,
          data: body
        };

        axios(options)
          .then((res) => {
            this.deliveries = res.data.deliveries;
            const { deliveries } = res.data;
            for (let i = 0; i < deliveries.length; i++) {
              if (deliveries[i].alias === 'merge_postamat_delivery') {
                this.points = deliveries[i].pickup_points;
              }
            }
            this.group = res.data.groups;
            this.payments = res.data.payments;
            this.isLoading = false;
          });
      }
    }
  };
</script>

<style lang="scss" scoped>
  label {
    display: block;
    font-size: 1rem;
    padding: 10px 0;
  }

  .delivery {
    padding: 40px 0;
    position: relative;

    &__name {
      vertical-align: middle;
      padding-left: 18px;
    }

    &__item {
      margin-bottom: 10px;
    }

    &__select {
      color: #4dba87;
      font-size: 14px;
      font-style: italic;
    }

    &__point-address {
      display: block;
      font-size: 12px;
      color: #aaa;
    }

    &__label {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__duration {
      color: #aaa;
      padding-left: 10px;
    }
  }

  .map-modal__close-btn {
    display: block;
    width: 20px;
    height: 20px;
    background: url(/img/icons/close.svg) no-repeat center;
    background-size: contain;
    margin: 0 20px 20px auto;
  }
</style>
