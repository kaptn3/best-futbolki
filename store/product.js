export const state = () => ({
  product: {},
  catalogReferences: {}
});

export const mutations = {
  setProduct(state, data) {
    state.product = data;
  },
  setCatalogReference(state, data) {
    state.catalogReferences = data;
  }
};

export const actions = {
  getProduct({ commit }, productId) {
    return this.$axios
      .get(`/test_api.php/?i=${productId}`)
      .then((res) => {
        commit('setProduct', res.data);

        return this.$axios.get('catalog_references.php');
      })
      .then((res) => {
        commit('setCatalogReference', res.data);
      });
  }
};
