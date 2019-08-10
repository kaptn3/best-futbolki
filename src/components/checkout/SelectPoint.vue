<template>
  <div class="map map-modal">
    <slot/>
    <yandex-map
      v-if="points"
      :coords="coords"
      :use-object-manager="true"
      zoom="10"
      :init-without-markers="true"
    >
      <ymap-marker
        v-for="(point, index) in points"
        :key="point.id"
        :marker-id="point.id"
        :coords="[point.latitude, point.longitude]"
        :balloon="{
          header: balloonHeader(point.name),
          body: balloonBody(index),
          footer: balloonFooter(point)
        }"
        :cluster-name="point.delivery_brand_alias"
        :icon="{ color: point.delivery_brand_color }"
      />
    </yandex-map>
    <div class="map__baloon-btns-hidden">
      <button
        v-for="point in points"
        :key="point.id"
        class="map__baloon-btn"
        @click="onClick(point.id, point.address)"
      />
    </div>
  </div>
</template>

<script>
  import { yandexMap, ymapMarker } from 'vue-yandex-maps';

  export default {
    name: 'SelectPoint',
    components: {
      yandexMap,
      ymapMarker
    },
    props: {
      points: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        markerIcon: {
          color: 'red'
        }
      };
    },
    computed: {
      coords() {
        return this.points.length > 0 ? [this.points[0].latitude, this.points[0].longitude] : [];
      }
    },
    methods: {
      onClick(id, address) {
        this.$store.state.pointIdDelivery = id;
        this.$store.state.address = address;
      },
      balloonHeader(name) {
        return `
          Пункт выдачи ${name}
        `;
      },
      balloonBody(index) {
        return `
          <div class="map__baloon">
            <button onclick="javascript: document.querySelectorAll('.map__baloon-btn')[${index}]
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
}
</style>
