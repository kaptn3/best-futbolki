export const state = () => ({
  ip: null,
  city: null
});

export const mutations = {
  setInfo(state, data) {
    state.city = data.city;
  },
  setIp(state, data) {
    state.ip = data.ip;
  }
};

export const actions = {
  getInfo({ commit }) {
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
        commit('setInfo', res.data);
      });
  }
};
