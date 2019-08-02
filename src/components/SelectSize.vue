<template>
  <div>
    <span class="current-size">Size: <b>{{ item }}</b></span>
    <label
      v-for="(size, index) in itemData"
      :for="'size-' + size.id"
      :key="index"
    >
      <input
        :id="'size-' + size.id"
        :value="size.id"
        :checked="index === 0"
        @input="changeItem($event.target.value)"
        name="size"
        type="radio"
      >
      <span class="size">
        {{ size.alias.substring(0, size.alias.indexOf('_')) }}
      </span>
    </label>
    <router-link
      to="#"
      class="size__guide"
    >
      <img src="/img/icons/size.svg" alt="">
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
    margin-bottom: 10px;
  }

  .current-size {
    display: block;
    color: #4f4f4f;
    margin-bottom: 15px;

    b {
      text-transform: uppercase;
    }
  }

  input {
    appearance: none;
  }

  .size {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border: 1px solid #bdbdbd;
    color: #bdbdbd;
    text-transform: uppercase;

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
