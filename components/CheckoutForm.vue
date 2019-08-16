<template>
  <div>
    <div class="checkout__input-group">
      <a-input
        id="last-name"
        name="last-name"
        placeholder="Фамилия"
      />
      <a-input
        id="first-name"
        name="first-name"
        placeholder="Имя"
      />
      <a-input
        id="middle-name"
        name="middle-name"
        placeholder="Отчество"
      />
    </div>
    <div class="checkout__input-group">
      <a-input
        id="phone"
        name="phone"
        placeholder="Телефон"
        type="phone"
      />
      <a-input
        id="email"
        name="email"
        placeholder="Email"
        type="email"
      />
    </div>
    <div class="checkout__input-group">
      <filter-select/>
    </div>
    <div class="checkout__input-group">
      <a-input
        id="address"
        v-model="$store.state.address"
        :required="false"
        name="address"
        placeholder="Адрес"
      />
    </div>
    <delivery/>
  </div>
</template>

<script>
  import AInput from '@/components/Input';
  import FilterSelect from '@/components/FilterSelect';
  import Delivery from '@/components/checkout/Delivery';

  export default {
    name: 'CheckoutForm',
    components: {
      AInput,
      FilterSelect,
      Delivery
    }
  };
</script>

<style lang="scss" scoped>
  .checkout {
    &__input-group {
      display: flex;
      margin-bottom: 12px;

      div {
        width: 100%;
      }

      & > div:not(:last-child) {
        margin-right: 10px;
      }
    }

    &__btn {
      width: 100%;
      margin-top: 26px;
    }
  }
</style>
