export const state = () => ({
  tags: [],
  title: ''
});

export const mutations = {
  setTags(state, data) {
    state.tags = data;
  }
};

export const actions = {
  getTags(context) {
    if (context.state.tags.length === 0) {
      this.$axios.get('/tags.php').then((res) => {
        context.commit('setTags', res.data);
      });
    }
  }
};
