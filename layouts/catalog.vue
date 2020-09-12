<template>
  <Layout>
    <v-row>
      <v-col v-if="catalogMobile" class="catalog" cols="12" sm="3" md="2">
        <v-navigation-drawer
          class="catalog__nav"
          width="100%"
          floating
          permanent
        >
          <div v-if="mobile" class="d-flex justify-end">
            <v-btn icon @click="catalogMobile = !catalogMobile">
              <v-icon small>mdi-close</v-icon>
            </v-btn>
          </div>
          <v-row class="catalog__imgs">
            <nuxt-link
              v-for="i in haveCover"
              :key="i.styles.cover"
              :to="`/tags/${i.id}`"
              class="col-6"
            >
              <img :src="i.styles.cover" />
            </nuxt-link>
          </v-row>
          <v-list dense nav>
            <v-list-item
              v-for="item in noHaveCover"
              :key="item.title"
              class="catalog__item"
            >
              <v-list-item-content>
                <v-list-item-title
                  :class="currentCat === item.id ? 'catalog__title_active' : ''"
                  class="catalog__title"
                  @click="showTags(item.id)"
                >
                  {{ item.title }}
                </v-list-item-title>
                <div v-if="mobile && showForTag && currentCat === item.id">
                  <div class="catalog__list-inner catalog__mobile-list">
                    <nuxt-link
                      v-for="i in tagsByParent"
                      :key="i.title"
                      :to="`/tags/${i.id}`"
                    >
                      {{ i.title }}
                    </nuxt-link>
                  </div>
                </div>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
        <div
          v-if="!mobile && showForTag"
          :style="`left: ${left}px`"
          class="catalog__list"
        >
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
            <v-btn
              v-if="mobile"
              color="primary"
              class="mb-5"
              block
              @click="catalogMobile = !catalogMobile"
            >
              Каталог
            </v-btn>
            <Nuxt />
          </v-container>
        </v-main>
      </v-col>
    </v-row>
  </Layout>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Layout from '~/components/layout';

export default {
  components: { Layout },
  data() {
    return {
      showForTag: false,
      tagsByParent: [],
      left: null,
      timeout: null,
      currentCat: null,
      to: null,
      cat: true,
      catalogMobile: true,
      mobile: true
    };
  },
  computed: {
    ...mapState({
      items: (state) => state.catalog.tags
    }),
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
  created() {
    this.getTags();
  },
  mounted() {
    window.addEventListener('mouseover', (e) => {
      const catalog = document.querySelector('.catalog');
      if (!catalog.contains(e.target)) {
        this.showForTag = false;
        this.currentCat = null;
      }
    });
    window.addEventListener('resize', this.catalogHandle);
    this.catalogHandle();
  },
  methods: {
    ...mapActions({
      getTags: 'catalog/getTags'
    }),
    catalogHandle(e) {
      this.mobile = window.innerWidth < 600;
      this.catalogMobile = !this.mobile;
    },
    showTagsHandle() {
      const items = this.items.filter((i) => i.parent === this.currentCat);
      this.tagsByParent = items;
      this.showForTag = true;
      this.left = document.querySelector('.catalog__nav').clientWidth;
    },
    showTags(cat) {
      /* if (this.currentCat) {
        if (this.cat) {
          clearTimeout(this.timeout);
          this.timeout = setTimeout(() => {
            this.currentCat = cat;
            this.cat = false;
            this.showTagsHandle();
          }, 1000);
        }
      } else { */
      this.currentCat = cat;
      this.showTagsHandle();
      // }
    },
    resetOver(cat) {
      clearTimeout(this.to);
      if (!this.cat) {
        this.to = setTimeout(() => {
          this.cat = true;
        }, 1000);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.catalog {
  margin-top: 100px;

  &__imgs {
    img {
      width: 100%;
      height: auto;
    }

    a {
      padding: 4px;
    }
  }

  &__item {
    cursor: pointer;
  }

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
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
      0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  }

  &__list-inner {
    column-count: 2;
    padding: 30px;

    a {
      text-decoration: none;
      display: block;
      padding: 5px 0;
    }
  }

  &__title {
    &:hover {
      color: #43a047;
    }

    &_active {
      font-weight: bold !important;
      color: #43a047;
    }
  }
}

@media screen and (max-width: 600px) {
  .catalog {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    height: 100vh;
    overflow: scroll;
    padding: 0;
    margin: 0;

    &__mobile-list {
      padding: 10px 0;
    }
  }
}

@media screen and (max-width: 400px) {
  .catalog {
    &__mobile-list {
      column-count: 1;
    }
  }
}
</style>
