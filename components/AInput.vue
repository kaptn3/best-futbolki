<template>
  <v-text-field
    v-model="value"
    :filled="value.length > 0"
    :label="label"
    :name="name"
    :required="required"
    :counter="counter"
    :rules="rules"
    v-mask="name === 'phone' ? '+7 (###) ###-##-##' : null"
    validate-on-blur
  />
</template>

<script>
import { VueMaskDirective } from 'v-mask';

export default {
  name: 'AInput',
  directives: { mask: VueMaskDirective },
  props: {
    label: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    model: {
      type: String,
      required: true
    },
    required: {
      type: Boolean,
      default: true
    },
    counter: {
      type: String,
      default: undefined
    }
  },
  computed: {
    value: {
      get() {
        return this.$store.state.order[this.model];
      },
      set(value) {
        this.$store.commit('order/setData', {
          name: this.model,
          value
        });
      }
    },
    rules() {
      const rules = [];
      if (this.required) {
        rules.push(!!this.value || 'Необходимо заполнить');
      }
      if (this.name === 'email') {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        rules.push(pattern.test(this.value) || 'Неправильный e-mail.');
      }
      return rules;
    }
  }
};
</script>
