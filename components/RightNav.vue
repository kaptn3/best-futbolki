<template>
  <nav>
    <ul>
      <li>
        <button
          :style="{ 'background-image': 'url(' + nav[0].icon + ')' }"
        />
      </li>
      <li>
        <button
          :style="{ 'background-image': 'url(' + nav[1].icon + ')' }"
        />
      </li>
      <li>
        <button
          :style="{ 'background-image': 'url(' + nav[2].icon + ')' }"
          @click="open(nav[2].name)"
        >
          <span class="cart-count">
            {{ $store.state.cart.cartCount }}
          </span>
        </button>
        <transition name="slide-left">
          <div
            v-if="$store.state.modal.modalComponent === nav[2].name"
            class="right-nav__modal"
          >
            <cart/>
          </div>
        </transition>
      </li>
      <li>
        <button
          :style="{ 'background-image': 'url(' + nav[3].icon + ')' }"
        />
      </li>
    </ul>
  </nav>
</template>

<script>
  import Cart from './cart/Cart.vue';

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
            icon: '/img/icons/search.svg'
          },
          {
            name: 'wishlist',
            icon: '/img/icons/like.svg'
          },
          {
            name: 'cart',
            icon: '/img/icons/cart.svg'
          },
          {
            name: 'profile',
            icon: '/img/icons/user.svg'
          }
        ],
        modal: ''
      };
    },
    methods: {
      open(box) {
        this.$store.commit('modal/toggleModal', box);
      }
    }
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

  .cart-count {
    background-color: #bdbdbd;
    color: #fff;
    font-weight: 500;
    display: block;
    position: relative;
    top: 7px;
    left: 50%;
    width: 16px;
    height: 16px;
    border-radius: 100%;
    padding: 0 2px;
    font-size: 12px;
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
