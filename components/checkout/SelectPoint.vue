<template>
  <v-card>
    <v-card-title class="headline">
      Пункты выдачи
    </v-card-title>
    <div class="map-modal__menu">
      <label v-for="item in checkboxes" :key="item" class="map-modal__label">
        <input
          v-model="brandSelected"
          :value="item"
          type="checkbox"
          name="type"
        />
        <img :src="`/img/icons/${colors[item]}`" class="map-modal__icon" />
        {{ item }}
      </label>
    </div>
    <div v-if="pointSelected" class="map__selected">
      Выбран: {{ pointSelected }}
    </div>
    <yandex-map
      v-if="filterBrands"
      :coords="coords"
      :use-object-manager="true"
      :init-without-markers="true"
      :cluster-options="clusterOptions"
      zoom="10"
    >
      <ymap-marker
        v-for="(point, index) in filterBrands"
        :key="point.id"
        :marker-id="point.id"
        :coords="[point.latitude, point.longitude]"
        :balloon="{
          header: balloonHeader(point.delivery_brand_name, point.name),
          body: balloonBody(index),
          footer: balloonFooter(point)
        }"
        :cluster-name="point.delivery_brand_alias"
        :icon="{ color: colorIcon(point.delivery_brand_alias) }"
      />
    </yandex-map>
    <div class="map__baloon-btns-hidden">
      <button
        v-for="point in filterBrands"
        :key="point.id"
        class="map__baloon-btn"
        type="button"
        @click="
          onClick(point.id, point.address, point.delivery_alias, point.cost)
        "
      />
    </div>
  </v-card>
</template>

<script>
import { yandexMap, ymapMarker } from 'vue-yandex-maps';
import { mapState } from 'vuex';

const colors = {
  VSEMAYKI: 'pink',
  CDEK: 'darkGreen',
  BOXBERRY: 'red',
  DPD: 'blue',
  PICK_POINT: 'orange'
};

export default {
  name: 'SelectPoint',
  components: {
    yandexMap,
    ymapMarker
  },
  data() {
    return {
      pointSelected: '',
      brandSelected: [],
      colors: {
        'Vsemayki.ru': 'pink.png',
        СДЭК: 'darkGreen.png',
        Boxberry: 'red.png',
        DPD: 'blue.png',
        PickPoint: 'orange.png'
      }
    };
  },
  computed: {
    ...mapState({
      points: (state) => state.form.points
    }),
    coords() {
      return this.points.length > 0
        ? [this.points[0].latitude, this.points[0].longitude]
        : [];
    },
    clusterOptions() {
      const options = {};
      // eslint-disable-next-line
      for (const key in colors) {
        const preset = {
          preset: `islands#${colors[key]}ClusterIcons`
        };
        options[key] = preset;
      }
      return options;
    },
    checkboxes() {
      const brands = [];
      for (let i = 0; i < this.points.length; i++) {
        brands.push(this.points[i].delivery_brand_name);
      }
      const unique = [...new Set(brands)];
      return unique;
    },
    filterBrands() {
      const points = this.points.filter((item) => {
        if (this.brandSelected.length > 0) {
          return this.brandSelected.includes(item.delivery_brand_name);
        }
        return item;
      });
      return points;
    }
  },
  methods: {
    onClick(id, address, alias, cost) {
      this.$store.state.pointIdDelivery = id;
      this.$store.state.address = address;
      this.$store.state.pointAddress = address;
      this.$store.state.deliveryCost = cost;
      this.$store.state.pointCost = cost;
      this.pointSelected = address;
      this.$store.state.deliveryAlias = alias;
    },
    colorIcon(alias) {
      if (alias) {
        return colors[alias];
      }
      return 'blue';
    },
    balloonHeader(type, name) {
      return `
          Пункт выдачи ${type}: ${name}
        `;
    },
    balloonBody(index) {
      return `
          <div class="map__baloon">
            <button type="button" onclick="javascript: document.querySelectorAll('.map__baloon-btn')[${index}]
              .click();" class="map__baloon-choice">Выбрать</button>
          </div>
        `;
    },
    balloonFooter(point) {
      return `
          <div>
            Адрес: ${point.address}
          </div>
          <div>
            Время работы: ${point.work_time}
          </div>
          <div>
            Стоимость доставки: ${point.cost} руб.
          </div>
          <div>
            Оплата: ${this.payments(point.allowed_payments)}
          </div>
          <div>
            Срок доставки: ${this.duration(point.duration)}
          </div>
          <div>
            Описание: ${point.description}
          </div>
        `;
    },
    payments(array) {
      const payments = ['Наличными', 'Банковской картой'];
      const text = [];
      for (let i = 0; i < array.length; i++) {
        text.push(payments[array[i] - 1]);
      }
      return text;
    },
    duration(time) {
      let text = '';
      if (time.type === 'day') {
        if (time.max === 1) {
          text = ' день';
        } else if (time.max > 1 && time.max < 5) {
          text = ' дня';
        } else if (time.max > 4) {
          text = ' дней';
        }
      }
      return `${time.max} ${text}`;
    }
  }
};
</script>

<style lang="scss">
.ymap-container {
  height: 600px;
}

.map-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: scroll;
  z-index: 99;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.2);

  &__wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__inner {
    width: 80%;
    margin: 40px 20px;
    background: #fff;
    border-radius: 8px;
    padding-top: 20px;
    position: relative;
  }

  &__menu {
    position: absolute;
    top: 60px;
    right: 0;
    background-color: rgba(255, 255, 255, 0.9);
    width: 350px;
    max-height: 100%;
    z-index: 10;
    padding: 15px;
  }

  &__h4 {
    margin-bottom: 15px;
  }

  &__label {
    display: block;
    padding: 10px 0;
  }

  &__icon {
    margin-left: 8px;
    width: 22px;
  }
}

.map {
  &__baloon-btns-hidden {
    display: none;
  }

  &__baloon-choice {
    background: #4dba87;
    color: #fff;
    padding: 10px;
    display: block;
  }

  &__selected {
    padding: 20px 0;
  }
}
</style>
