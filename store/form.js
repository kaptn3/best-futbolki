export const state = () => ({
  deliveries: null,
  points: null,
  group: null,
  payments: null
});

export const mutations = {
  setInfo(state, { deliveries, group, payments }) {
    state.deliveries = deliveries;
    state.group = group;
    state.payments = payments;
  },
  setPoints(state, points) {
    state.points = points;
  }
};

export const actions = {
  getDelivery({ commit }, city) {
    const body = {
      user_id: 0,
      cart: [],
      address: {
        id: 0,
        country: 'Россия',
        region: '',
        region_type: '',
        city,
        address: 'string',
        postcode: '0'
      },
      is_merge_pickup_points: true
    };

    this.$axios.post('/delivery.php', body).then((res) => {
      const { deliveries } = res.data;
      console.log(res.data);
      for (let i = 0; i < deliveries.length; i++) {
        if (deliveries[i].alias === 'merge_postamat_delivery') {
          commit('setPoints', deliveries[i].pickup_points);
        }
      }
      commit('setInfo', {
        deliveries: res.data.deliveries,
        group: res.data.groups,
        payments: res.data.payments
      });
    });
  }
};
