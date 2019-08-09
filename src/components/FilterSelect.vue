<template>
  <div class="filter-select">
    <a-input
      id="city"
      v-model="searchText"
      name="city"
      placeholder="Город"
      autocomplete="off"
    />
    <ul
      id="city-select"
      :class="{ 'filter-select_open': isOpen }"
      name="city"
    >
      <li
        v-for="(city, index) in cities"
        :key="index"
        :value="index"
        @click="selectItem(cities[index].city)"
      >
        {{ city.city }}
      </li>
    </ul>
    <input
      type="text"
      :value="selected"
      hidden
    >
  </div>
</template>

<script>
  import axios from 'axios';
  import AInput from '@/components/Input';

  export default {
    name: 'FilterSelect',
    components: { AInput },
    data() {
      return {
        data: [],
        cities: [],
        searchText: '',
        selected: false,
        isOpen: false
      };
    },
    watch: {
      searchText() {
        if (this.selected) {
          this.isOpen = false;
          this.selected = false;
        } else {
          this.isOpen = this.searchText.length > 0;
          this.filterCities();
        }
      }
    },
    mounted() {
      const url = `${process.env.VUE_APP_API}/delivery_suggest.php?text=`;
      axios.get(url)
        .then((res) => {
          this.cities = res.data;
          this.data = res.data;
        });
    },
    methods: {
      filterCities() {
        this.cities = this.data.filter(item => item.city.toLowerCase()
          .indexOf(this.searchText.toLowerCase()) === 0);
      },
      selectItem(value) {
        this.isOpen = false;
        this.selected = true;
        this.$store.commit('updateDelivery', value);
        this.searchText = value;
      }
    }
  };
</script>

<style lang="scss" scoped>
  ul {
    list-style: none;
    padding: 0;
    color: #999;
    max-height: 150px;
    overflow-y: auto;
    display: none;
    position: absolute;
    background: #fff;
    z-index: 2;
    width: 100%;
  }

  li {
    cursor: pointer;
    display: block;
    border: 1px solid #f2f2f2;
    border-top: none;
    padding: 10px 15px;

    &:hover,
    &:focus {
      color: #4dba87;
      background-color: #f2f2f2;
    }
  }

  .filter-select {
    position: relative;

    &_open {
      display: block;
    }
  }
</style>
