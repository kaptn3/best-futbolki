<template>
  <div>
    <h3>Способ доставки</h3>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'Delivery',
    computed: {
      city() {
        console.log(this.$store.state.cityDelivery);
        return this.$store.state.cityDelivery;
      }
    },
    watch: {
      city() {
        const body = {
          'user_id': 0,
          'cart': [],
          'address': {
            'id': 0,
            'country': 'Россия',
            'region': '',
            'region_type': '',
            'city': this.city,
            'address': 'string',
            'postcode': '0'
          },
          'is_merge_pickup_points': true
        };

        const url = `${process.env.VUE_APP_API}/delivery.php`;

        axios.post(url, { crossDomain: true }, body)
          .then((res) => {
            console.log(res);
          });
      }
    }
  };
</script>
