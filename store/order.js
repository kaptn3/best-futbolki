export const state = () => ({
  orderStatus: '',
  orderId: '',
  ip: null,
  ipCity: null,
  lastName: '',
  middleName: '',
  email: '',
  firstName: '',
  phone: '',
  address: '',
  delivery: '',
  deliveryCost: 0,
  pointCost: 0,
  pointAddress: '',
  pickupDeliveryAlias: '',
  deliveryAlias: '',
  pickupPointId: '',
  payment: '',
  promocode: '',
  comment: '',
  city: null
});

export const mutations = {
  setIp(state, data) {
    state.ip = data.ip;
  },
  setData(state, { name, value }) {
    state[name] = value;
    window.localStorage.setItem(name, value);
  },
  setCity(state, { data, loaded }) {
    // if (!loaded) {
    state.delivery = '';
    state.deliveryAlias = '';
    state.pointAddress = '';
    state.pickupDeliveryAlias = '';
    state.pickupPointId = '';
    state.pointCost = 0;
    // }
    state.city = data;
    window.localStorage.setItem('city', data);
  },
  setRegionInfo(state, data) {
    state.region = data;
  },
  setOk(state, { status, id }) {
    state.orderStatus = status;
    state.orderId = id;
  }
};

export const actions = {
  sendForm({ state, commit }, cart) {
    // const formData = new FormData();
    const receiver = {};
    const address = {
      id: 0,
      country: 'Россия',
      region: '',
      region_type: '',
      postcode: '0'
    };
    address.city = state.city.city ? state.city.city : state.city;
    address.address = state.address;

    receiver.address = address;
    receiver['last-name'] = state.lastName;
    receiver['first-name'] = state.firstName;
    receiver['middle-name'] = state.middleName;
    receiver.phone = state.phone;
    receiver.email = state.email;
    receiver.comment = state.comment;
    receiver.name = `${state.lastName} ${state.firstName} ${state.middleName}`;

    const data = {};
    data.receiver = receiver;
    data.delivery =
      state.deliveryAlias === 'merge_postamat_delivery'
        ? state.pickupDeliveryAlias
        : state.deliveryAlias;
    data.payment_alias = state.payment;
    data.pickup_point_id =
      state.deliveryAlias === 'merge_postamat_delivery'
        ? state.pickupPointId
        : '0';
    data.promo_code = state.promocode;
    data.cart = cart;
    // Object.assign(data, { cart: this.$store.state.cart });
    commit('setData', {
      name: 'orderStatus',
      value: 'in-progress'
    });
    this.$axios.post('/order.php', data).then((res) => {
      commit('setOk', {
        status: 'ok',
        id: res.data.id
      });
      commit('cart/clearCart', null, { root: true });
    });
  },
  getCity({ commit }) {
    const localCity = window.localStorage.getItem('city');
    this.$axios
      .get('https://www.cloudflare.com/cdn-cgi/trace')
      .then((res) => {
        let text = res.data;
        const indexIp = text.indexOf('ip=') + 3;
        text = text.substring(indexIp);
        const ip = text.substring(0, text.indexOf('ts='));
        commit('setIp', ip);
        return this.$axios.get(`/geo_ip.php?ip=${ip}`);
      })
      .then((res) => {
        commit('setData', { name: 'ipCity', value: res.data.city });
        commit('setRegionInfo', res.data);
        if (localCity) {
          commit('setCity', { data: localCity, loaded: true });
        } else {
          commit('setCity', { data: res.data.city, loaded: true });
        }
      });
  },
  initFromLocal({ commit }) {
    const array = [
      'lastName',
      'middleName',
      'email',
      'firstName',
      'phone',
      'address',
      'payment',
      'promocode',
      'comment'
    ];
    for (let i = 0; i < array.length; i++) {
      const value = window.localStorage.getItem(array[i]) || '';
      commit('setData', {
        name: array[i],
        value
      });
    }
  }
};
