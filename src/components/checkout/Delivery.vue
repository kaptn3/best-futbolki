<template>
  <div class="delivery">
    <h3>Способ доставки</h3>
    <div
      v-for="(delivery, index) in deliveries"
      :key="index"
      class="delivery__item"
    >
      <label>
        <input
          v-if="city"
          v-model="type"
          type="radio"
          name="type"
          :value="delivery.alias"
        >
        <span class="delivery__name">{{ delivery.title }}</span>
      </label>
      <button
        v-if="delivery.alias === 'merge_postamat_delivery'"
        class="delivery__select"
        @click="togglePoints"
      >
        Выбрать пункт выдачи
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
  </div>
</template>

<script>
  import axios from 'axios';
  import SelectPoint from './SelectPoint';

  export default {
    name: 'Delivery',
    components: { SelectPoint },
    data() {
      return {
        deliveries: [],
        points: [],
        type: 0,
        group: [],
        isOpenModal: false
      };
    },
    computed: {
      city() {
        return this.$store.state.cityDelivery;
      }
    },
    watch: {
      city() {
        this.getData();
      }
    },
    mounted() {
      if (this.city) {
        this.getData();
      }
    },
    methods: {
      togglePoints() {
        this.isOpenModal = !this.isOpenModal;
      },
      getData() {
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
            this.points = res.data.deliveries[0].pickup_points;
            this.group = res.data.groups;
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
  }

  .map-modal__close-btn {
    display: block;
    width: 20px;
    height: 20px;
    background: url(/img/icons/close.svg) no-repeat center;
    background-size: contain;
    margin-left: auto;
    margin-bottom: 20px;
  }
</style>
