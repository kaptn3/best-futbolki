<template>
  <nav>
    <ul>
      <li
        v-for="item in nav"
        :key="item.name"
      >
        <button :style="{ 'background-image': 'url(' + item.icon + ')' }"/>
      </li>
    </ul>
  </nav>
</template>

<script>
  export default {
    name: 'RightNav',
    data() {
      return {
        nav: [
          {
            name: 'search',
            icon: '/img/icons/search.svg',
          },
          {
            name: 'wishlist',
            icon: '/img/icons/like.svg',
          },
          {
            name: 'cart',
            icon: '/img/icons/cart.svg',
          },
          {
            name: 'profile',
            icon: '/img/icons/user.svg',
          },
        ],
      };
    },
  };
</script>

<style lang="scss" scoped>
  ul {
    display: flex;
    align-items: center;
    list-style: none;
    padding: 0;
  }

  li {
    display: block;
    width: 54px;
    height: 54px;
    padding: 15px;

    &:hover,
    &:focus {
      background-color: #f2f2f2;
    }
  }

  button {
    background-color: transparent;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    display: block;
    width: 100%;
    height: 100%;
    padding: 0;
    border: none;
    outline: none;
  }
</style>
