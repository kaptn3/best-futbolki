<template>
  <v-text-field
    v-model="value"
    :filled="value.length > 0"
    :label="label"
    :name="name"
    :required="required"
    hide-details
  />
</template>

<script>
export default {
  name: 'AInput',
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
    }
  }
};
</script>
