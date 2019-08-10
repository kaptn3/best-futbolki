<template>
  <div>
    <h3>Способ доставки</h3>
    <label
      v-for="(delivery, index) in deliveries"
      :key="index"
    >
      <input type="radio">
      {{ delivery.title }}
    </label>
    <select-point :points="points"/>
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
        points: []
      };
    },
    computed: {
      city() {
        return this.$store.state.cityDelivery;
      }
    },
    watch: {
      city() {
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
            this.points = res.data.deliveries[0].pickup_points;
          });
      }
    }
  };
</script>
