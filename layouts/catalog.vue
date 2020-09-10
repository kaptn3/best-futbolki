<template>
  <Layout>
    <v-row>
      <v-col class="catalog" cols="2">
        <v-navigation-drawer
          class="catalog__nav"
          width="100%"
          floating
          permanent
        >
          <div class="d-flex">
            <img
              v-for="i in haveCover"
              :key="i.styles.cover"
              :src="i.styles.cover"
            />
          </div>
          <v-list dense nav>
            <v-list-item
              v-for="item in noHaveCover"
              :key="item.title"
              @mouseover="showTags(item.id)"
            >
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
        <div v-if="showForTag" :style="`left: ${left}px`" class="catalog__list">
          <div class="catalog__list-inner">
            <nuxt-link
              v-for="i in tagsByParent"
              :key="i.title"
              :to="`/tags/${i.id}`"
            >
              {{ i.title }}
            </nuxt-link>
          </div>
        </div>
      </v-col>
      <v-col>
        <v-main>
          <v-container fluid>
            <Nuxt />
          </v-container>
        </v-main>
      </v-col>
    </v-row>
  </Layout>
</template>

<script>
import Layout from '~/components/layout';

export default {
  components: { Layout },
  data() {
    return {
      items: [],
      showForTag: false,
      tagsByParent: [],
      left: null
    };
  },
  created() {
    this.getData();
  },
  mounted() {
    /* window.addEventListener('mouseout', (e) => {
      if (
        !document.querySelector('.catalog').contains(e.target) ||
        !document.querySelector('.catalog__list').contains(e.target)
      ) {
        this.showForTag = false;
      }
    }); */
  },
  computed: {
    types() {
      return this.items.filter((i) => i.parent === '');
    },
    haveCover() {
      return this.types.filter((i) => i.styles && i.styles.cover);
    },
    noHaveCover() {
      return this.types.filter((i) => !(i.styles && i.styles.cover));
    }
  },
  methods: {
    getData() {
      this.$axios.get('/tags.php').then((res) => {
        this.items = res.data;
        console.log(this.types[29].styles.cover);
      });
    },
    showTags(cat) {
      const items = this.items.filter((i) => i.parent === cat);
      this.tagsByParent = items;
      this.showForTag = true;
      this.left = document.querySelector('.catalog__nav').clientWidth;
    }
  }
};
</script>

<style lang="scss" scoped>
.catalog {
  margin-top: 64px;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);

  &__list {
    position: fixed;
    top: 0;
    left: 33%;
    bottom: 0;
    height: 100%;
    z-index: 11;
    background-color: #fff;
    overflow: scroll;
    width: 100%;
    max-width: 572px;
  }

  &__list-inner {
    column-count: 2;
    padding: 30px;
  }
}
</style>
