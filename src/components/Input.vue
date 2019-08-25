<template>
  <div>
    <input
      :id="id"
      v-model="input"
      v-imask="imask"
      :type="type"
      :name="name"
      :pattern="pattern"
      :autocomplete="autocomplete"
      :required="required"
      @blur="$emit('blur')"
      @accept="onAccept"
      @complete="onComplete"
    >
    <label
      :for="id"
      :class="{ 'filled': filled }"
    >
      {{ placeholder }}{{ required ? ' *' : '' }}
    </label>
  </div>
</template>

<script>
  import {IMaskDirective} from 'vue-imask';

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
      },
      min: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        input: this.value,
        lazy: true,
        complete: false
      };
    },
    computed: {
      imask() {
        if (this.type === 'tel') {
          return {
            mask: '+7 (000) 000-00-00', 
            lazy: this.lazy
          }
        }
        return null;
      },
      filled() {
        if (this.type === 'tel') {
          return this.input.length > 0 && this.complete;
        }
        return this.input.length > 0;
      },
      pattern() {
        const pattern = "^(\\+7)[\\s]\\([0-9]{3}\\)[\\s\\-][0-9]{3}[\\s\\-][0-9]{2}[\\s\\-][0-9]{2}$";
        return this.type === 'tel' ? pattern : null;
      }
    },
    watch: {
      value(value) {
        this.input = value;
      },
      input(value) {
        this.$emit('input', value);
      }
    },
    directives: {
      imask: IMaskDirective
    },
    methods: {
      onAccept(e) {
        this.lazy = false;
        const maskRef = e.detail;
        this.complete = false;
      },
      onComplete(e) {
        const maskRef = e.detail;
        this.complete = true;
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
  }

  .filled {
    color: #4dba87;
  }
</style>
