<template>
  <nav>
    <ul>
      <li
        v-for="item in nav"
        :key="item.name"
      >
        <button
          :style="{ 'background-image': 'url(' + item.icon + ')' }"
          @click="open(item.name)"
        />
        <transition name="slide-left">
          <div
            v-if="$store.state.modalComponent === item.name"
            class="right-nav__modal"
          >
            <cart/>
          </div>
        </transition>
      </li>
    </ul>
  </nav>
</template>

<script>
  import Cart from './Cart.vue';

  export default {
    name: 'RightNav',
    components: {
      Cart,
    },
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
        modal: '',
      };
    },
    methods: {
      open(box) {
        this.$store.commit('toggleModal', box);
      },
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

  .right-nav {
    &__modal {
      position: fixed;
      right: 0;
      top: 0;
      height: 100vh;
      overflow-y: auto;
      width: 100%;
      max-width: 785px;
      background-color: #fff;
      z-index: 100;
    }
  }

  .slide-left-enter,
  .slide-left-leave-to {
    transform: translateX(100%);
  }

  .slide-left-enter-active {
    transition: transform .3s ease;
  }

  .slide-left-leave-active {
    transition: transform .3s ease;
  }
</style>
