<template>
  <v-row justify="center">
    <v-col cols="12" sm="10">
      <v-row>
        <v-col cols="12" md="7">
          <AForm />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import AForm from '~/components/AForm';

export default {
  components: {
    AForm
  }
};
</script>
