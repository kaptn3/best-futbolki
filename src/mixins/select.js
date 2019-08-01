export default {
  data() {
    return {
      item: '',
      itemData: [],
    };
  },
  methods: {
    changeItem(value) {
      this.item = (this.itemData.filter(item => item.id === value))[0].name;
      this.$emit('model', value);
    },
  },
  watch: {
    res() {
      this.itemData = this.res[this.object].filter((item) => {
        for (let i = 0; i < this.data.length; i++) {
          if (this.data[i] === item.id) {
            return item;
          }
        }
        return false;
      });
      this.item = this.itemData[0].name;
    },
  },
};
