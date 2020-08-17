<template>
  <v-card>
    <v-container fluid>
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
              :balloon-template="balloonTemplate(index, point)"
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
        СДЭК: 'green',
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
      setData: 'order/setData',
      changeModal: 'form/changeModal'
    }),
    onClick(id, address, alias, cost) {
      console.log(id, address, alias, cost);
      this.setData({
        name: 'address',
        value: address
      });
      this.setData({
        name: 'pickupDeliveryAlias',
        value: alias
      });
      this.setData({
        name: 'pickupPointId',
        value: id
      });
      this.setData({
        name: 'pointCost',
        value: cost
      });
      this.setData({
        name: 'deliveryCost',
        value: cost
      });
      this.setData({
        name: 'pointAddress',
        value: address
      });
      this.changeModal(false);
    },
    colorIcon(alias) {
      if (alias) {
        return colors[alias];
      }
      return 'blue';
    },
    balloonTemplate(index, point) {
      return `<h2 class="subtitle-2">Пункт выдачи ${
        point.delivery_brand_name
      }: ${point.name}</h2>
      <div class="map__baloon">
        <button type="button" onclick="javascript: document.querySelectorAll('.map__baloon-btn')[${index}]
          .click();" class="v-btn v-btn--contained theme--light v-size--small primary">Выбрать</button>
      </div>
      <div>
        <span class="font-weight-bold">Адрес:</span> ${point.address}
      </div>
      <div>
        <span class="font-weight-bold">Время работы:</span> ${point.work_time}
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
      </div>`;
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
  height: 70vh;
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
