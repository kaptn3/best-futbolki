<template>
  <li>
    <a :href="item.link">{{ item.name }}</a>
    <div v-if="item.submenu">
      <i
        v-if="item.submenu"
        class="menu__next-icon"
      />
      <ul
        v-if="item.submenu"
        :class="{ 'submenu_open': isSubmenu }"
        class="submenu"
      >
        <li
          v-for="(sub, index) in item.submenu"
          :key="index"
        >
          <router-link :to="sub.link">
            {{ sub.name }}
          </router-link>
        </li>
      </ul>
    </div>
  </li>
</template>

<script>
  export default {
    name: 'MenuItem',
    props: {
      item: {
        type: Object,
        required: true
      }
    }
  };
</script>

<style lang="scss" scoped>
  a {
    padding: 20px 25px;
    border-top: 1px solid #f2f2f2;
    cursor: pointer;
    display: flex;
    align-items: center;

    &:hover,
    &:focus {
      background-color: #f2f2f2;
    }
  }

  .submenu {
    position: absolute;
    left: 0;
    top: 0;
    transform: translateX(100%);

    &_open {
      transform: translate(-100%);
    }
  }
</style>
