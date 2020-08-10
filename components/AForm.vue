<template>
  <v-form>
    <v-row>
      <v-col cols="12" md="4">
        <v-text-field
          v-model="form.lastName"
          :filled="form.lastName.length > 0"
          label="Фамилия"
          hide-details
          required
        />
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          v-model="form.firstName"
          :filled="form.firstName.length > 0"
          label="Имя"
          hide-details
          required
        />
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          v-model="form.middleName"
          :filled="form.middleName.length > 0"
          label="Отчество"
          hide-details
          required
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="form.phone"
          :filled="form.phone.length > 0"
          label="Телефон"
          hide-details
          required
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="form.email"
          :filled="form.email.length > 0"
          label="E-mail"
          hide-details
          required
        />
      </v-col>
      <v-col cols="12">
        <v-autocomplete
          v-model="form.city"
          :items="items"
          :filled="form.city.length > 0"
          :loading="isLoading"
          :search-input.sync="search"
          hide-no-data
          hide-selected
          hide-details
          item-text="city"
          label="Город"
          return-object
          autocomplete="off"
        >
          <template v-slot:item="data">
            <span v-if="data.item.region">{{ data.item.region }}, </span>
            {{ data.item.city }}
          </template>
        </v-autocomplete>
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="form.address"
          :filled="form.address.length > 0"
          label="Адрес"
          hide-details
          required
        />
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
export default {
  name: 'AForm',
  data() {
    return {
      items: [],
      isLoading: false,
      search: null,
      form: {
        lastName: '',
        middleName: '',
        firstName: '',
        phone: '',
        email: '',
        city: '',
        address: ''
      }
    };
  },
  watch: {
    search(val) {
      this.isLoading = true;

      this.$axios
        .get(`/delivery_suggest.php?text=${this.search}`)
        .then((res) => {
          this.items = res.data;
        })
        .finally(() => (this.isLoading = false));
    },
    model() {
      console.log(this.model);
    }
  }
};
</script>
