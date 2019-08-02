<template>
  <div class="details">
    <div
      v-if="isLoaded"
      class="container details__box"
    >
      <h2>Product Detail</h2>
      <div class="details__row">
        <div>
          <div
            v-for="(detail, index) in row1"
            :key="'row-1' + index"
            class="details__item"
          >
            <h3>{{ detail.title }}:</h3>
            <span>{{ detail.value }}</span>
          </div>
        </div>
        <div>
          <div
            v-for="(detail, index) in row2"
            :key="'row2-' + index"
            class="details__item"
          >
            <h3>{{ detail.title }}:</h3>
            <span>{{ detail.value }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ProductDetail',
    props: {
      details: {
        type: Array,
        required: true
      }
    },
    computed: {
      row1() {
        return [this.details[2], this.details[3]];
      },
      row2() {
        return [this.details[0], this.details[1], this.details[4]];
      },
      isLoaded() {
        return this.details.length > 0;
      }
    }
  };
</script>

<style lang="scss" scoped>
  h2 {
    font-size: 24px;
    margin-bottom: 30px;
  }

  .details {
    background-color: #f2f2f2;
    color: #4f4f4f;
    padding: 30px 0;

    &__box {
      width: 70%;
    }

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
        margin-left: 20px;

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

  @media screen and (max-width: 991px) {
    .details {
      &__box {
        width: 70%;
      }
    }
  }

  @media screen and (max-width: 767px) {
    .details {
      &__box {
        width: 100%;
      }
    }
  }
</style>
