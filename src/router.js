import Vue from 'vue';
import Router from 'vue-router';
import Product from '@/views/Product.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/product/658981_mansmockfull'
    },
    {
      path: '/product/:id',
      name: 'product',
      component: Product
    }
  ]
});
