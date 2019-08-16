<template>
  <div>
    <span class="current-size">Size: <b>{{ item }}</b></span>
    <input
      class="current-size-alias"
      :value="alias"
      hidden
    >
    <label
      v-for="(size, index) in itemData"
      :key="index"
      :for="'size-' + size.id"
    >
      <input
        :id="'size-' + size.id"
        :value="size.id"
        :checked="index === 0"
        name="size"
        type="radio"
        @input="changeItem($event.target.value)"
      >
      <span class="size">
        {{ size.alias }}
      </span>
    </label>
    <router-link
      to="#"
      class="size__guide"
    >
      <img
        src="/img/icons/size.svg"
        alt=""
      >
      Size guide
    </router-link>
  </div>
</template>

<script>
  import select from '@/mixins/select';

  export default {
    name: 'SelectSize',
    mixins: [select],
    props: {
      data: {
        type: Array,
        required: true
      },
      res: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        object: 'size'
      };
    }
  };
</script>

<style lang="scss" scoped>
  div {
    font-size: 14px;
  }

  label {
    display: inline-block;
    margin-right: 10px;
    padding-top: 0;
  }

  .current-size {
    display: block;
    color: #4f4f4f;
    margin-bottom: 15px;
  }

  input {
    appearance: none;
  }

  .size {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    border: 1px solid #bdbdbd;
    color: #bdbdbd;
    padding: 0 5px;
    font-size: 13px;

    &:hover,
    &:focus {
      border-width: 2px;
    }

    &__guide {
      display: flex;
      color: #828282;
      margin-top: 15px;

      img {
        width: 20px;
        margin-right: 10px;
        margin-left: 30px;
      }
    }
  }

  input:checked ~ .size {
    border-width: 2px;
    border-color: #828282;
    color: #828282;
  }
</style>
