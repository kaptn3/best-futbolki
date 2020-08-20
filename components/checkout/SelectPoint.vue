<template>
  <v-container class="pt-0" fluid>
    <v-row>
      <v-col cols="12" sm="9" class="map">
        <v-tabs v-model="tabs" color="green darken-1" class="tabs" grow>
          <v-tab>
            На карте
          </v-tab>
          <v-tab>
            Из списка
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tabs" touchless>
          <v-tab-item key="На карте">
            <v-autocomplete
              v-model="point"
              :items="filterBrands"
              :allow-overflow="false"
              prepend-icon="mdi-magnify"
              hide-no-data
              item-text="address"
              placeholder="Поиск по пунктам"
              class="mobile-search"
              return-object
              clearable
            />
            <yandex-map
              v-if="filterBrands"
              :coords="coords"
              :cluster-options="clusterOptions"
              :zoom="10"
              :controls="[
                'fullscreenControl',
                'geolocationControl',
                'zoomControl'
              ]"
              use-object-manager
              init-without-markers
              @map-was-initialized="mapLoaded"
            >
              <ymap-marker
                v-for="(pointItem, index) in filterBrands"
                :key="pointItem.id"
                :marker-id="pointItem.id"
                :coords="[pointItem.latitude, pointItem.longitude]"
                :balloon-template="balloonTemplate(index, pointItem)"
                :cluster-name="pointItem.delivery_brand_alias"
                :icon="{ color: colorIcon(pointItem.delivery_brand_alias) }"
              />
            </yandex-map>
          </v-tab-item>
          <v-tab-item key="Из списка">
            <div v-for="(item, index) in colors" :key="item">
              <div v-if="groupPoints(index)">
                <div class="d-flex align-center pa-2 grey lighten-2">
                  <img
                    :src="`/img/icons/${
                      colors[groupPoints(index)[0].delivery_brand_name]
                    }.png`"
                    class="mr-2"
                  />
                  <div>
                    <div class="font-weight-bold">
                      {{ groupPoints(index)[0].delivery_brand_name }}
                    </div>
                    <div class="text-caption">
                      {{ duration(groupPoints(index)[0].duration) }},
                      {{ groupPoints(index)[0].cost }} руб.
                    </div>
                  </div>
                </div>
                <div
                  v-for="pointI in groupPoints(index)"
                  :key="'point-list-' + pointI.id"
                  class="py-3 pr-2 pl-10"
                  @click="
                    onClick(
                      pointI.id,
                      pointI.address,
                      pointI.delivery_alias,
                      pointI.cost
                    )
                  "
                >
                  {{ pointI.address }}
                </div>
              </div>
            </div>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
      <v-col cols="12" sm="3" class="checkboxes" style="z-index: 99;">
        <v-autocomplete
          v-model="point"
          :items="filterBrands"
          :allow-overflow="false"
          prepend-icon="mdi-magnify"
          hide-no-data
          item-text="address"
          placeholder="Поиск по пунктам"
          class="pt-0"
          return-object
          hide-details
          clearable
        />
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
    <div
      v-if="!myMap"
      class="d-flex justify-center align-center pa-10 map__prog"
    >
      <v-progress-circular :size="50" color="primary" indeterminate />
    </div>
    <div class="map__baloon-btns-hidden">
      <button
        v-for="pointF in filterBrands"
        :key="pointF.id"
        class="map__baloon-btn"
        type="button"
        @click="
          onClick(pointF.id, pointF.address, pointF.delivery_alias, pointF.cost)
        "
      />
    </div>
  </v-container>
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
      tabs: 'На карте',
      brandSelected: [],
      colors: {
        'Vsemayki.ru': 'pink',
        СДЭК: 'darkGreen',
        Boxberry: 'red',
        DPD: 'blue',
        PickPoint: 'orange'
      },
      point: null,
      myMap: null
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
  watch: {
    point() {
      if (this.point) {
        this.myMap.setCenter([this.point.latitude, this.point.longitude], 16);
      }
      // this.myMap.balloon.open(this.coords);
    }
  },
  mounted() {
    const t = this;
    window.addEventListener('resize', () => {
      if (window.innerWidth > 599 && t.tabs !== 'На карте') {
        t.tabs = 'На карте';
      }
      if (window.innerWidth < 600) {
        this.brandSelected = [];
      }
    });
  },
  beforeDestroy() {
    this.myMap = null;
  },
  methods: {
    ...mapMutations({
      setData: 'order/setData',
      changeModal: 'form/changeModal'
    }),
    groupPoints(name) {
      const points = this.points.filter(
        (item) => item.delivery_brand_name === name
      );
      if (points.length > 0) {
        return points;
      }
      return false;
    },
    mapLoaded(myMap) {
      this.myMap = myMap;
    },
    onClick(id, address, alias, cost) {
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
          .click();" class="v-btn v-btn--contained theme--light v-size--small primary" style="background-color: #43a047 !important; border-color: #43a047 !important;">Выбрать</button>
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

  &__prog {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #fff;
  }
}

.tabs,
.mobile-search {
  display: none;
}

@media screen and (max-width: 599px) {
  .map {
    padding-left: 0;
    padding-right: 0;
  }

  .ymap-container {
    padding-left: 20px;
    padding-right: 20px;
    // zoom: 1.1;
    // position: absolute;
    // left: -14px;
    // top: 0px;
  }

  .tabs {
    display: block;
  }

  .mobile-search {
    display: flex;
    padding-left: 20px;
    padding-right: 20px;
  }

  .checkboxes {
    display: none;
  }
}
</style>
