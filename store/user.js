export const state = () => ({
  cities: []
});

export const mutations = {
  setCities(state, data) {
    state.cities = data;
  }
};

export const actions = {
  getCities(context) {
    if (context.state.cities.length === 0) {
      this.$axios.get('/delivery_suggest.php?text=').then((res) => {
        context.commit('setCities', res.data);
      });
    }
  }
};
