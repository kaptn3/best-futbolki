<template>
  <div>
    <input
      :id="id"
      v-model="input"
      :type="type"
      :name="name"
      :autocomplete="autocomplete"
      :required="required"
      @blur="$emit('blur')"
    >
    <label
      :for="id"
      :class="{ 'filled': input.length > 0 }"
    >
      {{ placeholder }}{{ required ? ' *' : '' }}
    </label>
  </div>
</template>

<script>
  export default {
    name: 'Input',
    props: {
      type: {
        type: String,
        default: 'text'
      },
      id: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      placeholder: {
        type: String,
        required: true
      },
      autocomplete: {
        type: String,
        default: 'on'
      },
      required: {
        type: Boolean,
        default: true
      },
      value: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        input: this.value
      };
    },
    watch: {
      value(value) {
        this.input = value;
      },
      input(value) {
        this.$emit('input', value);
      }
    }
  };
</script>

<style lang="scss" scoped>
  div {
    position: relative;
    margin-top: 20px;
  }

  input {
    width: 100%;
    border: none;
    padding: 10px 0;
    font-size: 18px;
    line-height: 44px;
    height: 44px;
    border-bottom: 1px solid #bdbdbd;
    outline: none;
  }

  label {
    display: block;
    color: #999;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    transition: .2s top, .2s font-size;
  }

  input:focus ~ label,
  .filled {
    top: -10px;
    font-size: 14px;
    color: #4dba87;
  }
</style>
