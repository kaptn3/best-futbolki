<template>
  <div>
    <yandex-map
      v-if="points.length > 0"
      :coords="coords"
      :use-object-manager="true"
      zoom="10"
      :init-without-markers="true"
      @set-coords="coords = $event"
    >
      <ymap-marker
        v-for="(point, index) in points"
        :key="point.id"
        :marker-id="point.id"
        :coords="[point.latitude, point.longitude]"
        :balloon-template="balloonTemplate(index)"
        cluster-name="hey"
      />
    </yandex-map>
    <div class="map__baloon-btns-hidden">
      <button
        v-for="point in points"
        :key="point.id"
        class="map__baloon-btn"
        @click="onClick(point.id)"
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
        required: true
      }
    },
    data() {
      return {
        coord: ''
      };
    },
    computed: {
      coords() {
        return this.points.length > 0 ? [this.points[0].latitude, this.points[0].longitude] : [];
      }
    },
    methods: {
      onClick(e) {
        console.log(e);
      },
      balloonTemplate(index) {
        return `<button onclick="javascript: document.querySelectorAll('.map__baloon-btn')[${index}]
          .click();" class="map__baloon-choice">Выбрать</button>`;
      }
    }
  };
</script>

<style lang="scss" scoped>
.ymap-container {
  height: 600px;
}

.map {
  &__baloon-btns-hidden {
    display: none;
  }
}
</style>
