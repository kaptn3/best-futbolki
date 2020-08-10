export const state = () => ({
  product: {},
  catalogReferences: {},
  sizeTable: {},
  moreInfo: null,
  printType: null,
  printTypes: []
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
  setPrintTypes(state, data) {
    state.printTypes = data;
  },
  setCurrentType(state, key) {
    if (state.printType.id !== key) {
      for (let i = 0; i < state.printTypes.length; i++) {
        if (state.printTypes[i].tkey === key) {
          state.printType = {};
          state.printType = {
            id: key,
            title: state.printTypes[i].title,
            text: state.printTypes[i].text
          };
        }
      }
    }
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
    this.$axios.get(`/product_info.php?pt=${id}`).then((res) => {
      context.commit('setMoreInfo', res.data.text);
    });
  },
  getPrintType(context, key) {
    if (!context.state.printTypes[0]) {
      this.$axios.get('/product_printtype.php').then((res) => {
        context.commit('setPrintTypes', res.data.children);
        context.commit('setCurrentType', key);
      });
    } else {
      context.commit('setCurrentType', key);
    }
  }
};
