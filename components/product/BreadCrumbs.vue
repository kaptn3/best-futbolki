<template>
  <ul>
    <li
      v-for="(item, index) in menu"
      :key="index"
    >
      <router-link
        v-if="index !== (menu.length - 1)"
        :to="item.link"
      >
        &nbsp;{{ item.name }}
      </router-link>
      <span v-if="index === (menu.length - 1)">&nbsp;{{ item.name }}</span>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'BreadCrumbs',
    data() {
      return {
        menu: [
          {
            name: 'Default Category',
            link: '#'
          },
          {
            name: 'Women',
            link: '#'
          },
          {
            name: 'Tops',
            link: '#'
          },
          {
            name: 'Tees',
            link: '#'
          },
          {
            name: 'Radiant Tee',
            link: '#'
          }
        ]
      };
    }
  };
</script>

<style lang="scss" scoped>
  ul {
    display: inline-block;
    list-style: none;
    padding: 0;
    color: #828282;
    font-size: 14px;
  }

  li {
    display: inline-block;
  }

  li:not(:last-child)::after {
    content: " / ";
  }

  span {
    color: #333;
  }
</style>
