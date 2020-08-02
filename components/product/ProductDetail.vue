<template>
  <v-container class="details" fluid>
    <v-row justify="center">
      <v-col cols="10">
        <h2 class="h2">Описание</h2>
        <div class="details__row">
          <div>
            <div
              v-for="(detail, index) in details"
              :key="'row-1' + index"
              class="details__item"
            >
              <h3 class="h3">{{ detail.title }}:</h3>
              <span>{{ detail.value }}</span>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'ProductDetail',
  props: {
    details: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style lang="scss" scoped>
.details {
  background-color: #f2f2f2;
  color: #4f4f4f;
  padding: 30px 0;

  &__row {
    display: flex;

    & > div {
      width: 50%;
      flex-shrink: 1;
    }

    & > div:first-child {
      margin-right: 20px;

      div {
        margin-bottom: 20px;
      }

      h3 {
        margin-bottom: 10px;
      }
    }

    & > div:last-child {
      padding: 10px 0;

      div {
        margin-bottom: 10px;
      }

      h3 {
        display: inline-block;
        margin-right: 15px;
      }

      span {
        width: 50%;
      }
    }
  }

  h3 {
    font-size: 1rem;
  }
}
</style>
