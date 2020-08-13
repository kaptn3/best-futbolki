<template>
  <v-card>
    <v-container>
      <v-row>
        <v-col sm="9" md="10">
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
        </v-col>
        <v-col sm="3" md="2">
          <v-checkbox
            v-for="item in checkboxes"
            :key="item"
            v-model="brandSelected"
            :value="item"
            :color="colors[item]"
            hide-details
          >
            <template v-slot:label>
              <span :class="`${colors[item]}--text`">
                {{ item }}
              </span>
            </template>
          </v-checkbox>
        </v-col>
      </v-row>
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
    </v-container>
  </v-card>
</template>

<script>
import { yandexMap, ymapMarker } from 'vue-yandex-maps';
import { mapState, mapMutations } from 'vuex';

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
      brandSelected: [],
      colors: {
        'Vsemayki.ru': 'pink',
        СДЭК: 'darkGreen',
        Boxberry: 'red',
        DPD: 'blue',
        PickPoint: 'orange'
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
    ...mapMutations({
      setData: 'order/setData'
    }),
    onClick(id, address, alias, cost) {
      console.log(id, address, alias, cost);
      // this.$store.state.address = address;
      this.setData({
        name: 'address',
        value: address
      });
      // this.$store.state.deliveryAlias = alias;
      this.setData({
        name: 'pickupDeliveryAlias',
        value: alias
      });
      // this.$store.state.pointIdDelivery = id;
      this.setData({
        name: 'pickupPointId',
        value: id
      });
      /* 
      this.$store.state.pointAddress = address;
      this.$store.state.deliveryCost = cost;
      this.$store.state.pointCost = cost;
       */
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
              .click();" class="v-btn v-btn--contained theme--light v-size--small primary">Выбрать</button>
          </div>
        `;
    },
    balloonFooter(point) {
      return `
          <div>
            <span class="font-weight-bold">Адрес:</span> ${point.address}
          </div>
          <div>
            <span class="font-weight-bold">Время работы:</span> ${
              point.work_time
            }
          </div>
          <div>
            <span class="font-weight-bold">Стоимость доставки:</span> ${
              point.cost
            } руб.
          </div>
          <div>
            <span class="font-weight-bold">Оплата:</span> ${this.payments(
              point.allowed_payments
            )}
          </div>
          <div>
            <span class="font-weight-bold">Срок доставки:</span> ${this.duration(
              point.duration
            )}
          </div>
          <div>
            <span class="font-weight-bold">Описание:</span> ${point.description}
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
  max-height: 100%;
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
