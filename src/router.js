import Vue from 'vue';
import Router from 'vue-router';
import Product from '@/views/Product.vue';
import Checkout from '@/views/Checkout.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/product/:id',
      name: 'product',
      component: Product
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: Checkout
    }
  ]
});
