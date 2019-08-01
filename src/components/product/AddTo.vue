<template>
  <div>
    <button
      v-for="(item, index) in items"
      :key="index"
    >
      <img
        :src="item.icon"
        :alt="item.name + ' icon'">
      {{ item.name }}
    </button>
  </div>
</template>

<script>
  export default {
    name: 'AddTo',
    data() {
      return {
        items: [
          {
            name: 'Add to favorite',
            icon: '/img/icons/like.svg',
          },
          {
            name: 'Add to compare',
            icon: '/img/icons/compare.svg',
          },
        ],
      };
    },
  };
</script>

<style lang="scss" scoped>
  button {
    font-size: 14px;
    color: #828282;
    width: 50%;
    text-align: left;

    img {
      width: 20px;
      margin-right: 6px;
      vertical-align: text-top;
    }

    &:hover,
    &:focus {
      opacity: .8;
    }
  }
</style>
