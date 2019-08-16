<template>
  <nav>
    <button
      class="menu__btn"
      @click="openMenu"
    />
    <div
      :class="{ 'menu_open': $store.state.modalComponent === 'menu' }"
      class="menu__modal"
    >
      <button
        class="menu__close"
        @click="closeMenu"
      >
        <i class="menu__icon menu__close-icon"/>
      </button>
      <ul
        class="menu__list"
      >
        <menu-item
          v-for="(item, index) in menu"
          :key="index"
          :item="item"
        />
      </ul>
    </div>
  </nav>
</template>

<script>
  import MenuItem from './MenuItem';

  export default {
    name: 'Menu',
    components: {
      MenuItem
    },
    data() {
      return {
        menu: [
          {
            name: 'Home',
            link: '#'
          },
          {
            name: 'Women',
            link: '#'
          },
          {
            name: 'Men',
            link: '#'
          }
        ]
      };
    },
    methods: {
      openMenu() {
        this.$store.commit('toggleModal', 'menu');
      },
      closeMenu() {
        this.$store.commit('toggleModal', null);
      }
    }
  };
</script>

<style lang="scss" scoped>
  ul {
    list-style: none;
    padding: 0;
    background: #fff;
    width: 100%;
  }

  .menu {
    &__btn {
      background: #f2f2f2 url(/img/icons/menu.svg) no-repeat center;
      background-size: 24px;
      display: block;
      height: 54px;
      width: 54px;
      outline: none;
      border: none;
      opacity: .7;

      &:hover,
      &:focus {
        opacity: 1;
      }
    }

    &__list {
      position: relative;
    }

    &__modal {
      width: 350px;
      position: fixed;
      left: 0;
      top: 0;
      transform: translateX(-350px);
      transition: .3s transform;
      z-index: 3;
      overflow-x: hidden;
      overflow-y: auto;
      background-color: #f2f2f2;
      height: 100vh;
    }

    &__close {
      height: 54px;
      display: flex;
      align-items: center;
      width: 100%;
      border: none;
      outline: none;
      background-color: #fff;
      padding: 0;

      &:hover .menu__icon,
      &:focus .menu__icon {
        opacity: 1;
      }
    }

    &__close-icon,
    &__close-back,
    &__next-icon {
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      width: 15px;
      height: 15px;
      display: block;
    }

    &__close-icon {
      background-image: url(/img/icons/close.svg);
      margin-right: 15px;
      margin-left: auto;
      opacity: .7;
    }

    &__close-back {
      background-image: url(/img/icons/back-menu.svg);
      margin-left: 15px;
      opacity: .7;
    }

    &__next-icon {
      background-image: url(/img/icons/next-menu.svg);
      margin-left: auto;
      opacity: .7;
    }

    &_open {
      transform: translateX(0);
    }
  }
</style>
