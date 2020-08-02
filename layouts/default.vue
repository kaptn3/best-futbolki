<template>
  <v-app>
    <v-app-bar max-height="64px" flat fixed>
      <v-toolbar-title>Best futbolki</v-toolbar-title>
      <v-spacer />
      <v-btn icon>
        <v-icon>mdi-cart</v-icon>
      </v-btn>
    </v-app-bar>
    <Nuxt />
  </v-app>
</template>

<style>
html {
  overflow: auto !important;
}
</style>
