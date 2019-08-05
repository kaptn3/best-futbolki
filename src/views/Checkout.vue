<template>
  <div class="container">
    <h1>Корзина</h1>
    <h2>Ваши данные</h2>
    <form>
      <div class="checkout__input-group">
        <a-input
          id="last-name"
          name="last-name"
          placeholder="Фамилия *"
        />
        <a-input
          id="first-name"
          name="first-name"
          placeholder="Имя *"
        />
        <a-input
          id="middle-name"
          name="middle-name"
          placeholder="Отчество *"
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
        <a-input
          id="city"
          name="city"
          placeholder="Город"
        />
      </div>
      <div class="checkout__input-group">
        <a-input
          id="address"
          name="address"
          placeholder="Адрес"
        />
      </div>
      <a-button
        class="checkout__btn"
        text="Оформить заказ"
        disabled
      />
    </form>
  </div>
</template>

<script>
  import AInput from '@/components/Input';
  import AButton from '@/components/Button';

  export default {
    name: 'Checkout',
    components: {
      AInput,
      AButton
    }
  };
</script>

<style lang="scss" scoped>
  .checkout {
    &__input-group {
      display: flex;

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
