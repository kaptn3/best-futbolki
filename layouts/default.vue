<template>
  <Layout>
    <v-main>
      <v-container fluid>
        <Nuxt />
      </v-container>
    </v-main>
  </Layout>
</template>

<script>
import Layout from '~/components/layout';

export default {
  components: { Layout }
};
</script>
