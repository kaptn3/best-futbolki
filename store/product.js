export const state = () => ({
  product: {},
  catalogReferences: {},
  sizeTable: {},
  moreInfo: null,
  printType: null
});

export const mutations = {
  setProduct(state, data) {
    state.product = data;
  },
  setCatalogReference(state, data) {
    state.catalogReferences = data;
  },
  setSizeTable(state, data) {
    state.sizeTable = data;
  },
  setMoreInfo(state, data) {
    state.moreInfo = data;
  },
  setPrintType(state, data) {
    state.printType = data;
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
  },
  getSizeTable(context, id) {
    if (!context.state.sizeTable.text) {
      this.$axios.get(`/product_size.php?pt=${id}`).then((res) => {
        context.commit('setSizeTable', res.data);
      });
    }
  },
  getMoreInfo(context, id) {
    this.$axios
      .get(`/product_info.php?pt=${id}`)
      .then((res) => {
        context.commit('setMoreInfo', res.data.text);

        return this.$axios.get(`product_printtype.php`);
      })
      .then((res) => {
        console.log(res.data);
        context.commit('setPrintType', res.data.children);
      });
  }
};
