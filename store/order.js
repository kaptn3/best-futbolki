export const state = () => ({
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
  },
  setCity(state, data) {
    state.delivery = '';
    state.pickupDeliveryAlias = '';
    state.deliveryAlias = '';
    state.pickupPointId = '';
    state.city = data;
    window.localStorage.setItem('city', data);
  },
  setRegionInfo(state, data) {
    state.region = data;
  }
};

export const actions = {
  sendForm({ state, commit }, e) {
    // const fill = !!state.e.preventDefault();
    // const formData = new FormData();
    const receiver = {};
    const address = {
      id: 0,
      country: 'Россия',
      region: '',
      region_type: '',
      postcode: '0'
    };
    console.log(state.city);
    address.city = state.city.city ? state.city.city : state.city;

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
        commit('setCity', res.data.city);
        commit('setRegionInfo', res.data);
        if (localCity) {
          commit('setCity', localCity);
        }
      });
  }
};
