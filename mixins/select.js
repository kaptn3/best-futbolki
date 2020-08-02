export default {
  data() {
    return {
      item: '',
      itemData: [],
      alias: ''
    };
  },
  methods: {
    changeItem(value) {
      const filter = this.itemData.filter((item) => item.id === value)[0];
      this.item = filter.name;
      this.alias = filter.alias;
      this.$emit('model', value);
    }
  },
  mounted() {
    this.itemData = this.res[this.object].filter((item) => {
      for (let i = 0; i < this.data.length; i++) {
        if (this.data[i] === item.id) {
          return item;
        }
      }
      return false;
    });
    this.item = this.itemData[0].name;
    this.alias = this.itemData[0].alias;
  }
};
