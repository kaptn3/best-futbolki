<template>
  <div class="checkout__form-info">
    <div class="checkout__input-group">
      <a-input
        id="last-name"
        name="last-name"
        placeholder="Фамилия"
        @blur="setInfo"
      />
      <a-input
        id="first-name"
        name="first-name"
        placeholder="Имя"
        @blur="setInfo"
      />
      <a-input
        id="middle-name"
        name="middle-name"
        placeholder="Отчество"
        @blur="setInfo"
      />
    </div>
    <div class="checkout__input-group">
      <a-input
        id="phone"
        name="phone"
        placeholder="Телефон"
        type="tel"
        @blur="setInfo"
      />
      <a-input
        id="email"
        name="email"
        placeholder="Email"
        type="email"
        @blur="setInfo"
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
  import AInput from '../Input';
  import FilterSelect from './FilterSelect';
  import Delivery from '../checkout/Delivery';

  export default {
    name: 'CheckoutForm',
    components: {
      AInput,
      FilterSelect,
      Delivery
    },
    methods: {
      setInfo() {
        const form = document.querySelector('.checkout__form-info');
        const inputs = form.querySelectorAll('input');
        const obj = {};
        for (let i = 0; i < inputs.length; i++) {
          obj[inputs[i].name] = inputs[i].value;
        }
        window.localStorage.setItem('form', JSON.stringify(obj));
      }
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
